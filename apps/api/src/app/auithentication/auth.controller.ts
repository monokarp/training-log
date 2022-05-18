import { Request, Controller, Post, UseGuards } from '@nestjs/common';
import { UserWithPreferences } from '@training-log/contracts';
import { SkipJwtAuth } from './skip-jwt-auth.decorator';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local.guard';

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post()
	@SkipJwtAuth()
	@UseGuards(LocalAuthGuard)
	public authenticate(@Request() req: unknown & { user: UserWithPreferences }): {
		user: UserWithPreferences;
		token: string;
	} {
		return {
			user: req.user,
			token: this.authService.login(req.user),
		};
	}
}
