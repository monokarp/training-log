import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { DeleteExerciseData, ExerciseType, ExerciseWithPB, NewExerciseData } from '@training-log/contracts';
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

	@Put('create')
	public async create(@Body() body: { data: NewExerciseData }): Promise<{ id: string }> {
		const id = await this.exerciseService.create(body.data);
		return { id };
	}

	@Delete()
	public delete(@Body() body: DeleteExerciseData): Promise<boolean> {
		return this.exerciseService.delete(body);
	}
}
