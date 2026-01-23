import { AccountEntity } from "@db/entities";
import { ClsStore } from "nestjs-cls";

export interface GenshinBanpickCls extends ClsStore {
	account: AccountEntity;
}
