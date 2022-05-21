import { WeightUnit } from '../i18n';

export interface UserPreferences {
	unit: WeightUnit;
	localeCode: string;
}

export interface UpdatePreferences extends UserPreferences {
	userId: string;
}
