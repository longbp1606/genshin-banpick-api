import { ApiError } from "@errors";
import { ErrorCode } from "@utils/enums";

export class InvalidCredentialsError extends ApiError {
	constructor() {
		super({
			code: ErrorCode.INVALID_CREDENTIALS,
			message: "Invalid credentials",
			status: 401,
		});
	}
}
