import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpException,
	HttpStatus,
	Param,
	Put,
	UseGuards,
} from '@nestjs/common';
import { ExerciseType, ExerciseWithPB } from '@training-log/contracts';
import { CoachOnly } from '../auth/guards/coach-only';
import { DeleteExerciseDTO } from './dto/delete-exercise';
import { NewExerciseDTO } from './dto/new-exercise';
import { ExerciseService } from './exercise.service';

@Controller(':userId/exercises')
export class ExerciseController {
	constructor(private exerciseService: ExerciseService) {}

	@Get()
	public all(@Param('userId') userId: string): Promise<ExerciseType[]> {
		return this.exerciseService.all(userId);
	}

	@Get('withpb')
	public withPB(@Param('userId') userId: string): Promise<ExerciseWithPB[]> {
		return this.exerciseService.withPB(userId);
	}

	@Put()
	@UseGuards(CoachOnly)
	@HttpCode(HttpStatus.CREATED)
	public async create(@Param('userId') userId: string, @Body() body: NewExerciseDTO): Promise<{ id: string }> {
		const id = await this.exerciseService.create({ userId, ...body });

		return { id };
	}

	@Delete()
	@UseGuards(CoachOnly)
	public async delete(@Param('userId') userId: string, @Body() body: DeleteExerciseDTO): Promise<boolean> {
		const error = await this.exerciseService.delete({ userId, ...body });

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
