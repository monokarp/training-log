import { UpdatePreferences, WeightUnit } from '@training-log/contracts';
import { IsIn, IsLocale, IsNotEmpty } from 'class-validator';

export abstract class UpdatePreferencesDTO implements UpdatePreferences {
	@IsNotEmpty()
	userId!: string;

	@IsIn(['kg', 'lbs'])
	unit!: WeightUnit;

	@IsLocale()
	localeCode!: string;
}
