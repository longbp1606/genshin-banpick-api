import { AccountEntity } from "@db/entities";
import { Builder } from "builder-pattern";

export class ProfileResponse {
	id: string;
	email: string;
	ingameUuid: string;
	displayName: string;
	isAdmin: boolean;

	static fromEntity(entity: AccountEntity) {
		return Builder(ProfileResponse)
			.id(entity.id)
			.email(entity.email)
			.ingameUuid(entity.ingameUuid)
			.displayName(entity.displayName)
			.isAdmin(entity.isAdmin)
			.build();
	}

	static fromEntities(entities: AccountEntity[]) {
		return entities.map((entity) => this.fromEntity(entity));
	}
}
