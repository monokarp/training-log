import { Workout } from '@contracts';
import { Injectable } from '@nestjs/common';
import { WorkoutRepository } from './workout.repository';

@Injectable()
export class WorkoutService {
	constructor(private workoutRepository: WorkoutRepository) {}

	public including1RMs(traineeId: number): Promise<Workout[]> {
		return this.workoutRepository.including1RMs(traineeId);
	}
}
