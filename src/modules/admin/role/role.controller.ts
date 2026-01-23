import {
	Body,
	Controller,
	Get,
	Param,
	ParseIntPipe,
	Post,
	Put,
} from "@nestjs/common";
import { BaseApiResponse, SwaggerBaseApiResponse } from "@utils";
import { CreateRoleRequest, RoleResponse, UpdateRoleRequest } from "./dto";
import { RoleService } from "./role.service";

@Controller("/admin/roles")
export class RoleController {
	constructor(private readonly roleService: RoleService) {}

	@Get()
	@SwaggerBaseApiResponse(RoleResponse, { isArray: true })
	async listRoles() {
		const roles = await this.roleService.listRoles();
		return BaseApiResponse.success(RoleResponse.fromEntities(roles));
	}

	@Post()
	@SwaggerBaseApiResponse(RoleResponse)
	async createRole(@Body() dto: CreateRoleRequest) {
		const result = await this.roleService.createRole(dto);
		return BaseApiResponse.success(
			RoleResponse.fromEntity(result.role, result.permissions),
		);
	}

	@Put(":id")
	@SwaggerBaseApiResponse(RoleResponse)
	async updateRole(
		@Param("id", ParseIntPipe) id: number,
		@Body() dto: UpdateRoleRequest,
	) {
		const result = await this.roleService.updateRole(id, dto);
		return BaseApiResponse.success(
			RoleResponse.fromEntity(result.role, result.permissions),
		);
	}
}
