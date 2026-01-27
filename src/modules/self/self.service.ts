import { Injectable } from "@nestjs/common";
import { GenshinBanpickCls } from "@utils";
import { ClsService } from "nestjs-cls";

@Injectable()
export class SelfService {
	constructor(private readonly cls: ClsService<GenshinBanpickCls>) {}

	getSelf() {
		return this.cls.get("profile");
	}
}
