import { NewSet, NewWorkout } from '@training-log/contracts';
import { IsArray, IsDate, IsInt, IsNotEmpty, IsOptional, Min } from 'class-validator';

export abstract class NewWorkoutDTO implements NewWorkout {
	@IsDate()
	date!: Date;

	@IsOptional()
	comment?: string;

	@IsArray()
	sets!: NewSet[];
}

export abstract class NewSetDTO implements NewSet {
	@IsNotEmpty()
	exerciseId!: string;

	@IsInt()
	@Min(0)
	order!: number;

	@IsInt()
	@Min(1)
	sets!: number;

	@IsInt()
	@Min(1)
	reps!: number;

	@IsInt()
	@Min(0)
	weight!: number;

	@IsOptional()
	comment?: string;
}
