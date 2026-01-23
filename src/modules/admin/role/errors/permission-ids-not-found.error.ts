import { ApiError } from "@errors";
import { ErrorCode } from "@utils/enums";

export class PermissionIdsNotFoundError extends ApiError<{
	missingIds: number[];
}> {
	constructor(missingIds: number[]) {
		super({
			code: ErrorCode.VALIDATION_ERROR,
			message: "Permission ids not found",
			status: 400,
			detail: { missingIds },
		});
	}
}
