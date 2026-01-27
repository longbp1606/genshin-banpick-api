import { ApiError } from "@errors";
import { ErrorCode } from "@utils/enums";

export class StaffRoleInactiveError extends ApiError {
	constructor() {
		super({
			code: ErrorCode.STAFF_ROLE_INACTIVE,
			message: "Staff role is inactive",
			status: 403,
		});
	}
}
