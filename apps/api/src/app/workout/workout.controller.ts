import { Body, Controller, Get, HttpCode, HttpStatus, Param, Put } from '@nestjs/common';
import { CreateWorkoutData, Workout } from '@training-log/contracts';
import { WorkoutService } from './workout.service';

@Controller('workouts')
export class WorkoutController {
	constructor(private workoutService: WorkoutService) {}

	@Get(':username')
	forTrainee(@Param('username') username: string): Promise<Workout[]> {
		return this.workoutService.including1RMs(username);
	}

	@Put()
	@HttpCode(HttpStatus.CREATED)
	public async create(@Body() body: { data: CreateWorkoutData }): Promise<{ id: number }> {
		const id = await this.workoutService.create(body.data);

		return { id };
	}
}
