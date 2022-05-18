import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateWorkoutData, Workout } from '@training-log/contracts';
import { WorkoutService } from './workout.service';

@Controller('workouts')
export class WorkoutController {
	constructor(private workoutService: WorkoutService) {}

	@Get(':username')
	public forTrainee(@Param('username') username: string): Promise<Workout[]> {
		return this.workoutService.including1RMs(username);
	}

	@Get('one/:id')
	public one(@Param('id') id: number): Promise<Workout | null> {
		return this.workoutService.one(Number(id));
	}

	@Post()
	public async create(@Body() body: CreateWorkoutData): Promise<{ id: number }> {
		const id = await this.workoutService.create(body);

		return { id };
	}
}
