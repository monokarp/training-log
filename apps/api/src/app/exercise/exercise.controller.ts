import { Controller, Get, Param } from '@nestjs/common';
import { Exercise } from '@training-log/contracts';
import { ExerciseService } from './exercise.service';

@Controller('exercises')
export class ExerciseController {
	constructor(private exerciseService: ExerciseService) {}

	@Get(':username')
	getData(@Param('username') username: string): Promise<Exercise[]> {
		return this.exerciseService.getData(username);
	}
}
