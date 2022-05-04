import { Workout } from '@contracts';
import { Controller, Get, Param } from '@nestjs/common';
import { WorkoutService } from './workout.service';

@Controller('workouts')
export class WorkoutController {
	constructor(private workoutService: WorkoutService) {}

	@Get(':id')
	getData(@Param('id') id: string): Promise<Workout[]> {
		return this.workoutService.including1RMs(Number(id));
	}
}
