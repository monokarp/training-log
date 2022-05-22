import { Injectable } from '@nestjs/common';
import { UserFullData } from '@training-log/contracts';
import { UserService } from '../user/user.service';
import { CryptoService } from './crypto.service';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.type';

@Injectable()
export class AuthService {
	constructor(
		private userService: UserService,
		private cryptoService: CryptoService,
		private jwtService: JwtService,
	) {}

	public async validate(id: string, pw: string): Promise<UserFullData | null> {
		const userData = await this.userService.fullData(id);

		if (!userData) {
			return null;
		}

		if (!(await this.cryptoService.compare(pw, userData.password))) {
			return null;
		}

		return userData;
	}

	public login(user: UserFullData): string {
		const payload: JwtPayload = { sub: user.id, traineeIds: user.trainees.map(one => one.id) };

		return this.jwtService.sign(payload);
	}
}
