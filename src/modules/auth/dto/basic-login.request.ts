import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class BasicLoginRequest {
	@ApiProperty({ example: "user@example.com" })
	@IsString()
	ingameUuidOrEmail: string;

	@ApiProperty({ example: "P@ssw0rd!" })
	@IsString()
	password: string;
}
