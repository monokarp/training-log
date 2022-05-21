import { NewPersonalBest } from '@training-log/contracts';
import { IsNotEmpty, IsInt, IsDate } from 'class-validator';

export abstract class CreatePersonalBestDTO implements NewPersonalBest {
	@IsNotEmpty()
	userId!: string;

	@IsInt()
	weight!: number;

	@IsDate()
	starting!: Date;

	@IsNotEmpty()
	exerciseId!: string;
}
