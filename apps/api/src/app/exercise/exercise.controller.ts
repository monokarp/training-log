import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, Put } from '@nestjs/common';
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
	@HttpCode(HttpStatus.CREATED)
	public async create(@Body() body: { data: NewExerciseData }): Promise<{ id: string }> {
		const id = await this.exerciseService.create(body.data);

		return { id };
	}

	@Delete()
	public async delete(@Body() body: DeleteExerciseData): Promise<boolean> {
		const error = await this.exerciseService.delete(body);

		if (error) {
			throw new HttpException(
				{
					status: HttpStatus.CONFLICT,
					message: error,
				},
				HttpStatus.CONFLICT,
			);
		}

		return true;
	}
}
