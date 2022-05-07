import { Injectable } from '@nestjs/common';
import { Exercise } from '@training-log/contracts';
import { ExerciseRepository } from './exersice.repostiory';

@Injectable()
export class ExerciseService {
	constructor(private exerciseRepository: ExerciseRepository) {}

	public getData(username: string): Promise<Exercise[]> {
		return this.exerciseRepository.including1RMs(username);
	}
}
