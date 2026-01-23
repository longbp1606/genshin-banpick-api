import { Module } from "@nestjs/common";
import { StaffRoleController } from "./staff-role.controller";
import { StaffRoleService } from "./staff-role.service";

@Module({
	providers: [StaffRoleService],
	controllers: [StaffRoleController],
})
export class StaffRoleModule {}
