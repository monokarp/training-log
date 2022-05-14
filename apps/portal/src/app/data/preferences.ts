import { Injectable } from '@angular/core';
import { PreferencesUpdateData, UserPreferences } from '@training-log/contracts';
import { HttpService } from '../shared/http.service';

@Injectable()
export class Preferences {
	constructor(private httpService: HttpService) {}

	public async for(userId: string): Promise<UserPreferences> {
		try {
			const result = await this.httpService.get(`/api/preferences${userId}`);

			return result as UserPreferences;
		} catch (err) {
			throw new Error(`No preferences for ${userId}`);
		}
	}

	public async updateOne(data: PreferencesUpdateData): Promise<boolean> {
		try {
			await this.httpService.put(`/api/preferences`, data);

			return true;
		} catch (err) {
			return false;
		}
	}
}
