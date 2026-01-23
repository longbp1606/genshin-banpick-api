import { PermissionEntity } from "@db/entities";
import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";

@Injectable()
export class PermissionRepository extends Repository<PermissionEntity> {
	constructor(datasource: DataSource) {
		super(PermissionEntity, datasource.createEntityManager());
	}
}
