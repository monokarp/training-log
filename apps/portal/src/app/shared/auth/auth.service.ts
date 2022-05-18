import { Injectable } from '@angular/core';
import { UserAuthResult } from '@training-log/contracts';
import { SessionStore } from '../../pages/login/session.store';
import { HttpService } from '../core/http.service';

@Injectable()
export class AuthService {
	constructor(private httpService: HttpService, private sessionStore: SessionStore) {}

	public async login(userId: string, password: string): Promise<boolean> {
		const userData = await this.requestSession(userId, password);

		if (userData) {
			this.sessionStore.activeUser$.next(userData.user);

			const [first] = userData.trainees;

			this.sessionStore.currentlyManagedUser$.next(first ? first : userData.user);

			this.sessionStore.authToken$.next(userData.token);

			return true;
		}

		return false;
	}

	private async requestSession(userId: string, password: string): Promise<UserAuthResult | null> {
		try {
			const data = await this.httpService.post<{ username: string; password: string }, UserAuthResult>(
				`/api/auth`,
				{ username: userId, password },
			);

			return data;
		} catch (err) {
			return null;
		}
	}
}
