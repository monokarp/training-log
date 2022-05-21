import { Request, Controller, Post, UseGuards } from '@nestjs/common';
import { UserAuthResult, UserFullData } from '@training-log/contracts';
import { SkipJwtAuth } from './decorators/skip-jwt-auth';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local.guard';

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post()
	@SkipJwtAuth()
	@UseGuards(LocalAuthGuard)
	public authenticate(@Request() req: Request & { user: UserFullData }): UserAuthResult {
		// eslint-ignore-next-line @typescript-eslint/no-unused-vars
		const { password, trainees, ...userData } = req.user;

		return {
			trainees,
			user: userData,
			token: this.authService.login(req.user),
		};
	}
}
