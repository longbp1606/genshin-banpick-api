import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, IsStrongPassword } from "class-validator";

export class RegisterRequest {
	@ApiProperty({ example: "123456789" })
	@IsString()
	ingameUuid: string;

	@ApiProperty({ example: "user@example.com" })
	@IsEmail()
	email: string;

	@ApiProperty({ example: "User123" })
	@IsString()
	displayName: string;

	@ApiProperty({ example: "P@ssw0rd!" })
	@IsStrongPassword({
		minLength: 6,
		minLowercase: 1,
		minUppercase: 1,
		minNumbers: 1,
		minSymbols: 1,
	})
	password: string;
}
