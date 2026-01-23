import { ColumnNames, TableNames } from "@db/db.constants";
import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
} from "typeorm";
import { RoleEntity } from "./role.entity";

@Entity(TableNames.Account)
export class AccountEntity {
	@PrimaryGeneratedColumn("uuid", { name: ColumnNames.Account.id })
	id: string;

	@Column({ name: ColumnNames.Account.ingameUuid, nullable: true })
	ingameUuid: string;

	@Column({ name: ColumnNames.Account.email, unique: true })
	email: string;

	@Column({ name: ColumnNames.Account.displayName })
	displayName: string;

	@Column({ name: ColumnNames.Account.password, length: 300 })
	password: string;

	@CreateDateColumn({ name: ColumnNames.Global.createdAt })
	createdAt: Date;

	@Column({ name: ColumnNames.Account.lastLoginAt, nullable: true })
	lastLoginAt: Date;

	@Column({ name: ColumnNames.Account.isAdmin, default: false })
	isAdmin: boolean;

	@Column({ name: ColumnNames.Role.id, nullable: true })
	roleId: number;

	@ManyToOne(() => RoleEntity, {
		nullable: true,
		createForeignKeyConstraints: false,
	})
	@JoinColumn({ name: ColumnNames.Role.id })
	role: RoleEntity;
}
