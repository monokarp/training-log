import { Injectable } from '@nestjs/common';
import { ExerciseType } from '@training-log/contracts';
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
}
