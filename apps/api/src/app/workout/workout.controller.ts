import { CreateWorkoutData, Workout } from '@training-log/contracts';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { WorkoutService } from './workout.service';

@Controller('workouts')
export class WorkoutController {
	constructor(private workoutService: WorkoutService) {}

	@Get(':username')
	forTrainee(@Param('username') username: string): Promise<Workout[]> {
		return this.workoutService.including1RMs(username);
	}

	@Post()
	create(@Body() body: { data: CreateWorkoutData }): Promise<boolean> {
		return this.workoutService.create(body.data);
	}
}
