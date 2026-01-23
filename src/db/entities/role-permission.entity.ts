import { ColumnNames, TableNames } from "@db/db.constants";
import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
} from "typeorm";
import { PermissionEntity } from "./permission.entity";
import { RoleEntity } from "./role.entity";

@Entity(TableNames.RolePermission)
export class RolePermissionEntity {
	@PrimaryGeneratedColumn("increment", { name: ColumnNames.RolePermission.id })
	id: number;

	@Column({ name: ColumnNames.Role.id })
	roleId: number;

	@Column({ name: ColumnNames.Permission.id })
	permissionId: number;

	@ManyToOne(() => RoleEntity, { createForeignKeyConstraints: false })
	@JoinColumn({ name: ColumnNames.Role.id })
	role: RoleEntity;

	@ManyToOne(() => PermissionEntity, { createForeignKeyConstraints: false })
	@JoinColumn({ name: ColumnNames.Permission.id })
	permission: PermissionEntity;
}
