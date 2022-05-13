import { Injectable } from '@angular/core';
import { TranslationData, TranslationModel } from '@training-log/contracts';
import { Translations } from '../../data/translations';
import { SessionStore } from '../../login/session.store';
import { TranslationsStore } from './translations.store';

@Injectable()
export class TranslationsService {
	constructor(
		private sessionStore: SessionStore,
		private translations: Translations,
		private translationsStore: TranslationsStore,
	) {}

	public async loadStore() {
		const user = this.sessionStore.activeUser$.getValue();

		if (user) {
			const [entitites, locales] = await Promise.all([
				this.translations.for(user.id),
				this.translations.locales(),
			]);

			const model = entitites.reduce((acc, next) => {
				const existing = acc.find(one => one.code === next.code);

				const tln = { locale: next.localeCode, value: next.value };

				if (!existing) {
					acc.push({ code: next.code, translations: [tln] });
				} else {
					existing.translations.push(tln);
				}

				return acc;
			}, [] as TranslationModel[]);

			this.translationsStore.translations$.next(model);
			this.translationsStore.locales$.next(locales);
		}
	}

	public async updateOne(data: TranslationData) {
		const user = this.sessionStore.activeUser$.getValue();

		if (user) {
			const result = await this.translations.updateOne({ userId: user.id, ...data });

			if (result) {
				const entries = this.translationsStore.translations$.getValue();

				const target = entries.find(one => one.code === data.code);

				if (target) {
					const tln = target.translations.find(one => one.locale === data.localeCode);

					if (tln) {
						tln.value = data.value;
					} else {
						target.translations.push({ locale: data.localeCode, value: data.value });
					}
				}

				this.translationsStore.translations$.next(entries);
			}
		}
	}
}
