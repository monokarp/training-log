import { Controller, Get, Param } from '@nestjs/common';
import { PersonalBest } from '@training-log/contracts';
import { PersonalBestService } from './personal-best.service';

@Controller('personal-best')
export class PersonalBestController {
	constructor(private personalBestService: PersonalBestService) {}

	@Get(':username/:exerciseId')
	forTrainee(@Param('username') username: string, @Param('exerciseId') exerciseId: string): Promise<PersonalBest[]> {
		return this.personalBestService.byExercise(username, exerciseId);
	}
}
