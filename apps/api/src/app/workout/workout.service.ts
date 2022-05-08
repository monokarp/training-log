import { Injectable } from '@nestjs/common';
import { CreateWorkoutData, Workout } from '@training-log/contracts';
import { WorkoutRepository } from './workout.repository';

@Injectable()
export class WorkoutService {
	constructor(private workoutRepository: WorkoutRepository) {}

	public including1RMs(username: string): Promise<Workout[]> {
		return this.workoutRepository.including1RMs(username);
	}

	public create(data: CreateWorkoutData) {
		return this.workoutRepository.create(data);
	}
}
