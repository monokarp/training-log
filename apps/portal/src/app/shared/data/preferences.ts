import { Injectable } from '@angular/core';
import { UserPreferences, WithUser } from '@training-log/contracts';
import { HttpService } from '../core/http.service';

@Injectable()
export class Preferences {
	constructor(private httpService: HttpService) {}

	public async for(userId: string): Promise<UserPreferences> {
		try {
			const result = await this.httpService.get(`/api/${userId}/preferences`);

			return result as UserPreferences;
		} catch (err) {
			throw new Error(`No preferences for ${userId}`);
		}
	}

	public async updateOne(data: WithUser<UserPreferences>): Promise<boolean> {
		const { userId, ...payload } = data;

		try {
			await this.httpService.put(`/api/${userId}/preferences`, payload);

			return true;
		} catch (err) {
			return false;
		}
	}
}
