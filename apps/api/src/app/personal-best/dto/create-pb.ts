import { PersonalBestData } from '@training-log/contracts';
import { IsNotEmpty, IsInt, IsDateString } from 'class-validator';

export abstract class CreatePersonalBestDTO implements PersonalBestData {
	@IsInt()
	weight!: number;

	@IsDateString()
	starting!: Date;

	@IsNotEmpty()
	exerciseId!: string;
}
