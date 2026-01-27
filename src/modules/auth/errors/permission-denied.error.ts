import { ApiError } from "@errors";
import { ErrorCode } from "@utils/enums";

export class PermissionDeniedError extends ApiError {
	constructor() {
		super({
			code: ErrorCode.PERMISSION_DENIED,
			message: "Permission denied",
			status: 403,
		});
	}
}
