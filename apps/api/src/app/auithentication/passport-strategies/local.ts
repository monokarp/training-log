import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { UserWithPreferences } from '@training-log/contracts';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
	constructor(private authService: AuthService) {
		super();
	}

	async validate(userId: string, password: string): Promise<UserWithPreferences> {
		const user = await this.authService.validate(userId, password);

		if (!user) {
			throw new UnauthorizedException();
		}

		return user;
	}
}
