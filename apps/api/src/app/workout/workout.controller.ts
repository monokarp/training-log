import { Workout } from '@training-log/contracts';
import { Controller, Get, Param } from '@nestjs/common';
import { WorkoutService } from './workout.service';

@Controller('workouts')
export class WorkoutController {
	constructor(private workoutService: WorkoutService) {}

	@Get(':username')
	getData(@Param('username') username: string): Promise<Workout[]> {
		return this.workoutService.including1RMs(username);
	}
}
