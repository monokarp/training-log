import { Injectable } from '@nestjs/common';
import { PersonalBestData, PersonalBest, WithUser } from '@training-log/contracts';
import { PersonalBestRepository } from './personal-best.repository';

@Injectable()
export class PersonalBestService {
	constructor(private personalBestRepository: PersonalBestRepository) {}

	public for(username: string): Promise<PersonalBest[]> {
		return this.personalBestRepository.for(username);
	}

	public create(data: WithUser<PersonalBestData>): Promise<number> {
		return this.personalBestRepository.create(data);
	}

	public delete(id: number): Promise<string | null> {
		return this.personalBestRepository.delete(id);
	}
}
