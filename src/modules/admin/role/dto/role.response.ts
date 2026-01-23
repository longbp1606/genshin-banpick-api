import { PermissionEntity, RoleEntity } from "@db/entities";
import { ApiProperty } from "@nestjs/swagger";
import { Builder } from "builder-pattern";
import { PermissionResponse } from "@modules/admin/permission/dto";

export class RoleResponse {
	@ApiProperty()
	id: number;

	@ApiProperty()
	name: string;

	@ApiProperty()
	isActive: boolean;

	@ApiProperty()
	createdAt: Date;

	@ApiProperty()
	createdById: number;

	@ApiProperty()
	updatedAt: Date;

	@ApiProperty()
	updatedById: number;

	@ApiProperty({ type: [PermissionResponse] })
	permissions: PermissionResponse[];

	static fromEntity(entity: RoleEntity, permissions: PermissionEntity[]) {
		return Builder(RoleResponse)
			.id(entity.id)
			.name(entity.name)
			.isActive(entity.isActive)
			.createdAt(entity.createdAt)
			.createdById(entity.createdById)
			.updatedAt(entity.updatedAt)
			.updatedById(entity.updatedById)
			.permissions(PermissionResponse.fromEntities(permissions))
			.build();
	}

	static fromEntities(
		roles: { role: RoleEntity; permissions: PermissionEntity[] }[],
	) {
		return roles.map(({ role, permissions }) =>
			this.fromEntity(role, permissions),
		);
	}
}
