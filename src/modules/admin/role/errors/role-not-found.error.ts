import { ApiError } from "@errors";
import { ErrorCode } from "@utils/enums";

export class RoleNotFoundError extends ApiError {
	constructor() {
		super({
			code: ErrorCode.ROLE_NOT_FOUND,
			message: "Role not found",
			status: 404,
		});
	}
}
