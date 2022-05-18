import { Injectable } from '@nestjs/common';
import { UserWithPreferences } from '@training-log/contracts';
import { UserService } from '../user/user.service';
import { CryptoService } from './crypto.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
	constructor(
		private userService: UserService,
		private cryptoService: CryptoService,
		private jwtService: JwtService,
	) {}

	public async validate(id: string, pw: string): Promise<UserWithPreferences | null> {
		const userData = await this.userService.withPreferences(id);

		if (!userData) {
			return null;
		}

		if (!(await this.cryptoService.compare(pw, userData.pw))) {
			return null;
		}

		return userData.user;
	}

	public login(user: UserWithPreferences): string {
		const payload = { sub: user.id };

		return this.jwtService.sign(payload);
	}
}
