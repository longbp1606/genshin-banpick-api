import { PermissionEntity } from "@db/entities";
import {
	PermissionRepository,
	RolePermissionRepository,
	RoleRepository,
} from "@db/repositories";
import { Injectable } from "@nestjs/common";
import { In } from "typeorm";
import { CreateRoleRequest, UpdateRoleRequest } from "./dto";
import { PermissionIdsNotFoundError, RoleNotFoundError } from "./errors";

@Injectable()
export class RoleService {
	constructor(
		private readonly roleRepo: RoleRepository,
		private readonly permissionRepo: PermissionRepository,
		private readonly rolePermissionRepo: RolePermissionRepository,
	) {}

	private async resolvePermissions(permissionIds: number[]) {
		if (!permissionIds.length) {
			return [] as PermissionEntity[];
		}

		const permissions = await this.permissionRepo.findBy({
			id: In(permissionIds),
		});
		if (permissions.length !== permissionIds.length) {
			const foundIds = new Set(permissions.map((p) => p.id));
			const missingIds = permissionIds.filter((id) => !foundIds.has(id));
			throw new PermissionIdsNotFoundError(missingIds);
		}

		return permissions;
	}

	private async getPermissionsByRoleIds(roleIds: number[]) {
		if (!roleIds.length) {
			return new Map<number, PermissionEntity[]>();
		}

		const rolePermissions = await this.rolePermissionRepo.find({
			where: { roleId: In(roleIds) },
			relations: ["permission"],
		});

		const map = new Map<number, PermissionEntity[]>();
		rolePermissions.forEach((rp) => {
			if (!rp.permission) {
				return;
			}
			const list = map.get(rp.roleId) ?? [];
			list.push(rp.permission);
			map.set(rp.roleId, list);
		});

		return map;
	}

	async listRoles() {
		const roles = await this.roleRepo.find({ order: { id: "ASC" } });
		const permissionsByRoleId = await this.getPermissionsByRoleIds(
			roles.map((role) => role.id),
		);

		return roles.map((role) => ({
			role,
			permissions: permissionsByRoleId.get(role.id) ?? [],
		}));
	}

	async createRole(dto: CreateRoleRequest) {
		const permissionIds = dto.permissionIds ?? [];
		const permissions = await this.resolvePermissions(permissionIds);

		const role = this.roleRepo.create({
			name: dto.name,
			isActive: dto.isActive ?? true,
			createdById: dto.createdById,
			updatedById: dto.updatedById ?? dto.createdById,
		});

		const savedRole = await this.roleRepo.save(role);

		if (permissionIds.length) {
			const rolePermissions = permissionIds.map((permissionId) =>
				this.rolePermissionRepo.create({
					roleId: savedRole.id,
					permissionId,
				}),
			);
			await this.rolePermissionRepo.save(rolePermissions);
		}

		return { role: savedRole, permissions };
	}

	async updateRole(id: number, dto: UpdateRoleRequest) {
		const role = await this.roleRepo.findOne({ where: { id } });
		if (!role) {
			throw new RoleNotFoundError();
		}

		if (dto.name !== undefined) {
			role.name = dto.name;
		}
		if (dto.isActive !== undefined) {
			role.isActive = dto.isActive;
		}
		role.updatedById = dto.updatedById;

		const savedRole = await this.roleRepo.save(role);

		let permissions: PermissionEntity[] = [];
		if (dto.permissionIds) {
			permissions = await this.resolvePermissions(dto.permissionIds);
			await this.rolePermissionRepo.delete({ roleId: id });
			if (dto.permissionIds.length) {
				const rolePermissions = dto.permissionIds.map((permissionId) =>
					this.rolePermissionRepo.create({
						roleId: id,
						permissionId,
					}),
				);
				await this.rolePermissionRepo.save(rolePermissions);
			}
		} else {
			const permissionsByRoleId = await this.getPermissionsByRoleIds([id]);
			permissions = permissionsByRoleId.get(id) ?? [];
		}

		return { role: savedRole, permissions };
	}
}
