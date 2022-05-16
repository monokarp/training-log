import { Injectable } from '@angular/core';
import { UserPreferences } from '@training-log/contracts';
import { Preferences } from '../../../shared/data/preferences';
import { Translations } from '../../../shared/data/translations';
import { SessionStore } from '../../login/session.store';
import { PreferencesStore } from './preferences.store';

@Injectable()
export class PreferencesService {
	constructor(
		private translations: Translations,
		private preferences: Preferences,
		private sessionStore: SessionStore,
		private preferencesStore: PreferencesStore,
	) {}

	public async loadStore() {
		const user = this.sessionStore.activeUser$.getValue();

		if (user) {
			this.preferencesStore.units$.next(['kg', 'lbs']);
			this.preferencesStore.locales$.next(await this.translations.locales());
		}
	}

	public async save(preferences: UserPreferences) {
		const user = this.sessionStore.activeUser$.getValue();

		if (user) {
			const result = await this.preferences.updateOne({ userId: user.id, ...preferences });

			if (result) {
				this.sessionStore.activeUser$.next({
					...user,
					localeCode: preferences.localeCode,
					unit: preferences.unit,
				});
			}
		}
	}
}
