import { ColumnNames, TableNames } from "@db/db.constants";
import {
	Column,
	CreateDateColumn,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";
import { StaffRolePermissionEntity } from "./staff-role-permission.entity";

@Entity(TableNames.StaffRole)
export class StaffRoleEntity {
	@PrimaryGeneratedColumn("increment", { name: ColumnNames.StaffRole.id })
	id: number;

	@Column({ name: ColumnNames.StaffRole.name })
	name: string;

	@Column({ name: ColumnNames.Global.isActive, default: true })
	isActive: boolean;

	@CreateDateColumn({ name: ColumnNames.Global.createdAt })
	createdAt: Date;

	@Column({ name: ColumnNames.Global.createdById })
	createdById: string;

	@UpdateDateColumn({ name: ColumnNames.Global.updatedAt })
	updatedAt: Date;

	@Column({ name: ColumnNames.Global.updatedById })
	updatedById: string;

	@OneToMany(() => StaffRolePermissionEntity, (srp) => srp.staffRole)
	permissions: StaffRolePermissionEntity[];
}
