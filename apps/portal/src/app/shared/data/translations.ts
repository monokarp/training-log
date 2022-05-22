import { Injectable } from '@angular/core';
import { TranslationData, UpdateTranslation, WithUser } from '@training-log/contracts';
import { HttpService } from '../core/http.service';

@Injectable()
export class Translations {
	constructor(private httpService: HttpService) {}

	public async locales(userId: string): Promise<string[]> {
		try {
			const result = await this.httpService.get(`/api/${userId}/i18n/locales`);

			return (result as string[]) ?? [];
		} catch (err) {
			return [];
		}
	}

	public async for(userId: string): Promise<TranslationData[]> {
		try {
			const result = await this.httpService.get(`/api/${userId}/i18n/translations`);

			return (result as TranslationData[]) ?? [];
		} catch (err) {
			return [];
		}
	}

	public async updateOne(data: WithUser<UpdateTranslation>): Promise<boolean> {
		const { userId, ...payload } = data;

		try {
			await this.httpService.put(`/api/${userId}/i18n/translations`, payload);

			return true;
		} catch (err) {
			return false;
		}
	}
}
