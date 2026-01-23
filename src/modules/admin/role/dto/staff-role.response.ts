import { StaffRoleEntity } from "@db/entities";
import { ApiProperty } from "@nestjs/swagger";
import { Builder } from "builder-pattern";
import { PermissionResponse } from "@modules/admin/permission/dto";

export class StaffRoleResponse {
	@ApiProperty()
	id: number;

	@ApiProperty()
	name: string;

	@ApiProperty()
	isActive: boolean;

	@ApiProperty()
	createdAt: Date;

	@ApiProperty()
	createdById: string;

	@ApiProperty()
	updatedAt: Date;

	@ApiProperty()
	updatedById: string;

	@ApiProperty({ type: [PermissionResponse] })
	permissions: PermissionResponse[];

	static fromEntity(entity: StaffRoleEntity) {
		const permissions = entity.permissions?.map((rp) => rp.permission) ?? [];
		return Builder(StaffRoleResponse)
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

	static fromEntities(roles: StaffRoleEntity[]) {
		return roles.map((role) => this.fromEntity(role));
	}
}
