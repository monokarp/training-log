import { UpdateTranslation } from '@training-log/contracts';
import { IsLocale, IsNotEmpty } from 'class-validator';

export abstract class UpdateTranslationDTO implements UpdateTranslation {
	@IsNotEmpty()
	code!: string;

	@IsLocale()
	localeCode!: string;

	@IsNotEmpty()
	value!: string;
}
