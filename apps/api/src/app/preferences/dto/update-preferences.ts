import { UserPreferences, WeightUnit } from '@training-log/contracts';
import { IsIn, IsLocale } from 'class-validator';

export abstract class UpdatePreferencesDTO implements UserPreferences {
	@IsIn(['kg', 'lbs'])
	unit!: WeightUnit;

	@IsLocale()
	localeCode!: string;
}
