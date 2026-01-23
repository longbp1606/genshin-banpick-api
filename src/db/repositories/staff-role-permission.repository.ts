import { StaffRolePermissionEntity } from "@db/entities";
import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";

@Injectable()
export class StaffRolePermissionRepository extends Repository<StaffRolePermissionEntity> {
	constructor(datasource: DataSource) {
		super(StaffRolePermissionEntity, datasource.createEntityManager());
	}
}
