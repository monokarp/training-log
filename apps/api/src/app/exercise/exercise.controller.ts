import { Controller, Get, Param } from '@nestjs/common';
import { ExerciseType, ExerciseWithPB } from '@training-log/contracts';
import { ExerciseService } from './exercise.service';

@Controller('exercises')
export class ExerciseController {
	constructor(private exerciseService: ExerciseService) {}

	@Get('all/:username')
	public all(@Param('username') username: string): Promise<ExerciseType[]> {
		return this.exerciseService.all(username);
	}

	@Get('withpb/:username')
	public withPB(@Param('username') username: string): Promise<ExerciseWithPB[]> {
		return this.exerciseService.withPB(username);
	}
}
