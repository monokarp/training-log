import { Injectable } from '@angular/core';
import { UserWithPreferences } from '@training-log/contracts';
import { HttpService } from '../core/http.service';

@Injectable()
export class AuthService {
	constructor(private httpService: HttpService) {}

	public async login(userId: string, password: string): Promise<{ user: UserWithPreferences; token: string } | null> {
		try {
			const data = await this.httpService.post<
				{ username: string; password: string },
				{ user: UserWithPreferences; token: string }
			>(`/api/auth`, { username: userId, password });

			return data;
		} catch (err) {
			return null;
		}
	}
}
