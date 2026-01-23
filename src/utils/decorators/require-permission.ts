import { SetMetadata } from "@nestjs/common";
import { PermissionCode } from "@utils/types";

export const REQUIRE_PERMISSION_KEY = "require-permission";

export const RequirePermission = (permissionCode: PermissionCode) =>
	SetMetadata(REQUIRE_PERMISSION_KEY, permissionCode);
