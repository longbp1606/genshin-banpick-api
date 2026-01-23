import { RoleEntity } from "@db/entities";
import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";

@Injectable()
export class RoleRepository extends Repository<RoleEntity> {
	constructor(datasource: DataSource) {
		super(RoleEntity, datasource.createEntityManager());
	}
}
