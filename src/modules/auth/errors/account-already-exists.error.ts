import { ApiError } from "@errors";
import { ErrorCode } from "@utils/enums";

export class AccountAlreadyExistsError extends ApiError {
	constructor() {
		super({
			code: ErrorCode.ACCOUNT_ALREADY_EXISTS,
			message: "Account already exists",
			status: 409,
		});
	}
}
