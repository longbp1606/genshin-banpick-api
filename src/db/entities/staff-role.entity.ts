import { ColumnNames, TableNames } from "@db/db.constants";
import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";
import { StaffRolePermissionEntity } from "./staff-role-permission.entity";
import { AccountEntity } from "./account.entity";

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

	@ManyToOne(() => AccountEntity, { createForeignKeyConstraints: false })
	@JoinColumn({ name: ColumnNames.Global.createdById })
	createdBy: AccountEntity;

	@UpdateDateColumn({ name: ColumnNames.Global.updatedAt })
	updatedAt: Date;

	@Column({ name: ColumnNames.Global.updatedById })
	updatedById: string;

	@ManyToOne(() => AccountEntity, { createForeignKeyConstraints: false })
	@JoinColumn({ name: ColumnNames.Global.updatedById })
	updatedBy: AccountEntity;

	@OneToMany(() => StaffRolePermissionEntity, (srp) => srp.staffRole)
	permissions: StaffRolePermissionEntity[];
}
