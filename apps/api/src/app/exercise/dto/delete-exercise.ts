import { DeleteExercise } from '@training-log/contracts';
import { IsNotEmpty } from 'class-validator';

export abstract class DeleteExerciseDTO implements DeleteExercise {
	@IsNotEmpty()
	userId!: string;

	@IsNotEmpty()
	id!: string;
}
