import { Controller, Get } from "@nestjs/common";
import { PermissionService } from "./permission.service";
import { BaseApiResponse, SwaggerBaseApiResponse } from "@utils";
import { PermissionResponse } from "./dto";
import { ApiBearerAuth } from "@nestjs/swagger";
import { RequirePermission } from "@utils/decorators";

@Controller("/admin/permissions")
@ApiBearerAuth()
export class PermissionController {
	constructor(private readonly permissionService: PermissionService) {}

	@Get()
	@RequirePermission("admin.permission.list")
	@SwaggerBaseApiResponse(PermissionResponse, { isArray: true })
	async listPermissions() {
		const permissions = await this.permissionService.listPermissions();
		return BaseApiResponse.success(
			PermissionResponse.fromEntities(permissions),
		);
	}
}
