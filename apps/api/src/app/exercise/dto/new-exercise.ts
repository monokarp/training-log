import { NewExercise } from '@training-log/contracts';
import { IsNotEmpty, IsLocale } from 'class-validator';

export abstract class NewExerciseDTO implements NewExercise {
	@IsNotEmpty()
	userId!: string;

	@IsLocale()
	localeCode!: string;

	@IsNotEmpty()
	id!: string;

	@IsNotEmpty()
	name!: string;
}
