import { ColumnNames, TableNames } from "@db/db.constants";
import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
} from "typeorm";
import { PermissionEntity } from "./permission.entity";
import { StaffRoleEntity } from "./staff-role.entity";

@Entity(TableNames.StaffRolePermission)
export class StaffRolePermissionEntity {
	@PrimaryGeneratedColumn("increment", {
		name: ColumnNames.StaffRolePermission.id,
	})
	id: number;

	@Column({ name: ColumnNames.StaffRole.id })
	staffRoleId: number;

	@Column({ name: ColumnNames.Permission.id })
	permissionId: number;

	@ManyToOne(() => StaffRoleEntity, (sr) => sr.permissions, {
		createForeignKeyConstraints: false,
	})
	@JoinColumn({ name: ColumnNames.StaffRole.id })
	staffRole: StaffRoleEntity;

	@ManyToOne(() => PermissionEntity, { createForeignKeyConstraints: false })
	@JoinColumn({ name: ColumnNames.Permission.id })
	permission: PermissionEntity;
}
