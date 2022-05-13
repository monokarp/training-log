import { Injectable } from '@angular/core';
import { TranslationData, UpdateTranslationData } from '@training-log/contracts';
import { HttpService } from '../shared/http.service';

@Injectable()
export class Translations {
	constructor(private httpService: HttpService) {}

	public async locales(): Promise<string[]> {
		try {
			const result = await this.httpService.get(`/api/i18n/locales`);

			return (result as string[]) ?? [];
		} catch (err) {
			return [];
		}
	}

	public async for(userId: string): Promise<TranslationData[]> {
		try {
			const result = await this.httpService.get(`/api/i18n/translations/${userId}`);

			return (result as TranslationData[]) ?? [];
		} catch (err) {
			return [];
		}
	}

	public async updateOne(data: UpdateTranslationData): Promise<boolean> {
		try {
			await this.httpService.put(`/api/i18n/translations`, data);

			return true;
		} catch (err) {
			return false;
		}
	}
}
