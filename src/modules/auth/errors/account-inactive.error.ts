import { ApiError } from "@errors";
import { ErrorCode } from "@utils/enums";

export class AccountInactiveError extends ApiError {
	constructor() {
		super({
			code: ErrorCode.ACCOUNT_INACTIVE,
			message: "Account is inactive",
			status: 403,
		});
	}
}
