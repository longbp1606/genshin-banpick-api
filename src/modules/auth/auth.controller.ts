import { Body, Controller, Get, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import {
	BasicLoginRequest,
	ProfileResponse,
	RegisterRequest,
	TokenResponse,
} from "./dto";
import {
	BaseApiResponse,
	SwaggerBaseApiMessageResponse,
	SwaggerBaseApiResponse,
} from "@utils";
import { SkipAuth } from "@utils/decorators";
import { ApiBearerAuth } from "@nestjs/swagger";

@Controller("/auth")
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post("/register")
	@SkipAuth()
	@SwaggerBaseApiMessageResponse()
	async register(@Body() dto: RegisterRequest) {
		await this.authService.register(dto);
		return BaseApiResponse.success();
	}

	@Post("/login/basic")
	@SkipAuth()
	@SwaggerBaseApiResponse(TokenResponse)
	async basicLogin(@Body() dto: BasicLoginRequest) {
		const data = await this.authService.loginBasic(dto);
		return BaseApiResponse.success(data);
	}

	@Get("/profile")
	@SwaggerBaseApiResponse(ProfileResponse)
	@ApiBearerAuth()
	async getProfile() {
		const account = await this.authService.getCurrentAccount();
		return BaseApiResponse.success(ProfileResponse.fromEntity(account));
	}
}
