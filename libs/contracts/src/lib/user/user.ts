import { WeightUnit } from '../i18n';

export interface User {
	id: string;
	name: string;
}

export interface UserPreferences {
	unit: WeightUnit;
	localeCode: string;
}

export interface UserWithPreferences extends User, UserPreferences {}

export interface PreferencesUpdateData extends UserPreferences {
	userId: string;
}
