import { ApiProperty } from "@nestjs/swagger";
import {
	ArrayNotEmpty,
	ArrayUnique,
	IsArray,
	IsBoolean,
	IsInt,
	IsNotEmpty,
	IsOptional,
	IsString,
} from "class-validator";

export class CreateRoleRequest {
	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	name: string;

	@ApiProperty({ type: [Number] })
	@IsArray()
	@ArrayNotEmpty()
	@ArrayUnique()
	@IsInt({ each: true })
	permissionIds: number[];

	@ApiProperty({ required: false })
	@IsOptional()
	@IsBoolean()
	isActive?: boolean;

	@ApiProperty()
	@IsInt()
	createdById: number;

	@ApiProperty({ required: false })
	@IsOptional()
	@IsInt()
	updatedById?: number;
}
