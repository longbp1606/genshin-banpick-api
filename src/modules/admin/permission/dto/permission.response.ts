import { PermissionEntity } from "@db/entities";
import { ApiProperty } from "@nestjs/swagger";
import { Builder } from "builder-pattern";

export class PermissionResponse {
	@ApiProperty()
	id: number;

	@ApiProperty()
	code: string;

	@ApiProperty()
	description: string;

	@ApiProperty()
	deprecated: boolean;

	static fromEntity(entity: PermissionEntity) {
		return Builder(PermissionResponse)
			.id(entity.id)
			.code(entity.code)
			.description(entity.description)
			.deprecated(entity.deprecated)
			.build();
	}

	static fromEntities(entities: PermissionEntity[]) {
		return entities.map((entity) => this.fromEntity(entity));
	}
}
