import { RolePermissionEntity } from "@db/entities";
import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";

@Injectable()
export class RolePermissionRepository extends Repository<RolePermissionEntity> {
	constructor(datasource: DataSource) {
		super(RolePermissionEntity, datasource.createEntityManager());
	}
}
