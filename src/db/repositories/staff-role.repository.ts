import { StaffRoleEntity } from "@db/entities";
import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";

@Injectable()
export class StaffRoleRepository extends Repository<StaffRoleEntity> {
	constructor(datasource: DataSource) {
		super(StaffRoleEntity, datasource.createEntityManager());
	}
}
