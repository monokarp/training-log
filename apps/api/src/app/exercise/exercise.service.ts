import { Injectable } from '@nestjs/common';
import { DeleteExercise, ExerciseType, NewExercise, WithUser } from '@training-log/contracts';
import { ExerciseWithPB } from '@training-log/contracts';
import { ExerciseRepository } from './exersice.repostiory';

@Injectable()
export class ExerciseService {
	constructor(private exerciseRepository: ExerciseRepository) {}

	public all(userId: string): Promise<ExerciseType[]> {
		return this.exerciseRepository.all(userId);
	}

	public withPB(userId: string): Promise<ExerciseWithPB[]> {
		return this.exerciseRepository.allIncludingPBs(userId);
	}

	public create(data: WithUser<NewExercise>): Promise<string> {
		return this.exerciseRepository.create(data);
	}

	public delete(data: WithUser<DeleteExercise>): Promise<string | null> {
		return this.exerciseRepository.delete(data);
	}
}
