import { Injectable } from '@nestjs/common';
import { NewWorkout, Workout } from '@training-log/contracts';
import { WorkoutRepository } from './workout.repository';

@Injectable()
export class WorkoutService {
	constructor(private workoutRepository: WorkoutRepository) {}

	public one(id: number): Promise<Workout | null> {
		return this.workoutRepository.one(id);
	}

	public including1RMs(username: string): Promise<Workout[]> {
		return this.workoutRepository.including1RMs(username);
	}

	public create(data: NewWorkout) {
		return this.workoutRepository.create(data);
	}
}
