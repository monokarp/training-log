import { Injectable } from '@angular/core';
import { UserAuthResult } from '@training-log/contracts';
import { SessionService } from '../../pages/login/session.service';
import { HttpService } from '../core/http.service';

@Injectable()
export class AuthService {
	constructor(private httpService: HttpService, private sessionService: SessionService) {}

	public async login(userId: string, password: string): Promise<boolean> {
		const userData = await this.requestSession(userId, password);

		if (userData) {
			this.sessionService.login(userData);

			return true;
		}

		return false;
	}

	private async requestSession(userId: string, password: string): Promise<UserAuthResult | null> {
		try {
			const data = await this.httpService.post<{ username: string; password: string }, UserAuthResult>(
				`auth`,
				{ username: userId, password },
			);

			return data;
		} catch (err) {
			return null;
		}
	}
}
