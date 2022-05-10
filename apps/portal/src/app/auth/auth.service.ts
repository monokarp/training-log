import { Injectable } from '@angular/core';
import { UserWithPreferences } from '@training-log/contracts';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '../shared/http.service';

@Injectable()
export class AuthService {
	constructor(private httpService: HttpService) {}

	public async login(userId: string): Promise<UserWithPreferences | null> {
		try {
			const result = await this.httpService.post(`/api/auth`, { id: userId });

			return (result as UserWithPreferences) ?? null;
		} catch (err) {
			return null;
		}
	}
}
