import { Injectable } from '@nestjs/common';
import { TranslationData, UpdateTranslationData } from '@training-log/contracts';
import { I18nRepository } from './i18n.repository';

@Injectable()
export class I18nService {
	constructor(private i18nRepository: I18nRepository) {}

	public translationsFor(userId: string): Promise<TranslationData[]> {
		return this.i18nRepository.translationsFor(userId);
	}

	public async upsertOne(data: UpdateTranslationData): Promise<boolean> {
		return this.i18nRepository.upsertOne(data);
	}

	public async locales(): Promise<string[]> {
		return (await this.i18nRepository.locales()).map(one => one.code);
	}
}
