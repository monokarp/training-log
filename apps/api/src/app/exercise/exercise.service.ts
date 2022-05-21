import { Injectable } from '@nestjs/common';
import { DeleteExercise, ExerciseType, NewExercise } from '@training-log/contracts';
import { ExerciseWithPB } from '@training-log/contracts';
import { ExerciseRepository } from './exersice.repostiory';

@Injectable()
export class ExerciseService {
	constructor(private exerciseRepository: ExerciseRepository) {}

	public all(username: string): Promise<ExerciseType[]> {
		return this.exerciseRepository.all(username);
	}

	public withPB(username: string): Promise<ExerciseWithPB[]> {
		return this.exerciseRepository.allIncludingPBs(username);
	}

	public create(data: NewExercise): Promise<string> {
		return this.exerciseRepository.create(data);
	}

	public delete(data: DeleteExercise): Promise<string | null> {
		return this.exerciseRepository.delete(data);
	}
}
