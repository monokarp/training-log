import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { Workout } from '@training-log/contracts';
import { CoachOnly } from '../auth/guards/coach-only';
import { NewWorkoutDTO } from './dto/new-workout';
import { WorkoutService } from './workout.service';

@Controller(':userId/workouts')
export class WorkoutController {
	constructor(private workoutService: WorkoutService) {}

	@Get()
	public forTrainee(@Param('userId') userId: string): Promise<Workout[]> {
		return this.workoutService.including1RMs(userId);
	}

	@Get(':id')
	public one(@Param('id') id: number): Promise<Workout | null> {
		// TODO also add user id
		return this.workoutService.one(Number(id));
	}

	@Post()
	@UseGuards(CoachOnly)
	public async create(@Param('userId') userId: string, @Body() body: NewWorkoutDTO): Promise<{ id: number }> {
		const id = await this.workoutService.create({ userId, ...body });

		return { id };
	}
}
