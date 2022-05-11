import { Injectable } from '@nestjs/common';
import { PersonalBest } from '@training-log/contracts';
import { PersonalBestRepository } from './personal-best.repository';

@Injectable()
export class PersonalBestService {
	constructor(private personalBestRepository: PersonalBestRepository) {}

	public byExercise(username: string, exerciseId: string): Promise<PersonalBest[]> {
		return this.personalBestRepository.byUserAndExerise(username, exerciseId);
	}
}
