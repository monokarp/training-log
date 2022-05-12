import { Injectable } from '@nestjs/common';
import { DeleteExerciseData, ExerciseType, NewExerciseData } from '@training-log/contracts';
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

	public async create(data: NewExerciseData): Promise<string> {
		return this.exerciseRepository.create(data);
	}

	public async delete(data: DeleteExerciseData): Promise<string | null> {
		return this.exerciseRepository.delete(data);
	}
}
