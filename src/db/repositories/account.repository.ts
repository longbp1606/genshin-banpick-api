import { AccountEntity } from "@db/entities";
import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";

@Injectable()
export class AccountRepository extends Repository<AccountEntity> {
	constructor(datasource: DataSource) {
		super(AccountEntity, datasource.createEntityManager());
	}
}
