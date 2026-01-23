import { ColumnNames, TableNames } from "@db/db.constants";
import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";

@Entity(TableNames.Role)
export class RoleEntity {
	@PrimaryGeneratedColumn("increment", { name: ColumnNames.Role.id })
	id: number;

	@Column({ name: ColumnNames.Role.name })
	name: string;

	@Column({ name: ColumnNames.Global.isActive, default: true })
	isActive: boolean;

	@CreateDateColumn({ name: ColumnNames.Global.createdAt })
	createdAt: Date;

	@Column({ name: ColumnNames.Global.createdById })
	createdById: number;

	@UpdateDateColumn({ name: ColumnNames.Global.updatedAt })
	updatedAt: Date;

	@Column({ name: ColumnNames.Global.updatedById })
	updatedById: number;
}
