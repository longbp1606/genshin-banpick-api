import { Controller, Get } from "@nestjs/common";
import { PermissionService } from "./permission.service";
import { BaseApiResponse, SwaggerBaseApiResponse } from "@utils";
import { PermissionResponse } from "./dto";

@Controller("/admin/permissions")
export class PermissionController {
	constructor(private readonly permissionService: PermissionService) {}

	@Get()
	@SwaggerBaseApiResponse(PermissionResponse, { isArray: true })
	async listPermissions() {
		const permissions = await this.permissionService.listPermissions();
		return BaseApiResponse.success(
			PermissionResponse.fromEntities(permissions),
		);
	}
}
