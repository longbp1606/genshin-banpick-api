import { ProfileResponse } from "@modules/auth/dto";
import { ClsStore } from "nestjs-cls";

export interface GenshinBanpickCls extends ClsStore {
	profile: ProfileResponse;
}
