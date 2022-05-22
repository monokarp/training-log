import { Injectable } from '@angular/core';
import { NewWorkout } from '@training-log/contracts';
import { Workouts } from '../../../shared/data/workouts';
import { SessionStore } from '../../login/session.store';
import { NewWorkoutModel } from '../viewmodel/types';

@Injectable()
export class CreateSession {
	constructor(private workouts: Workouts, private sessionStore: SessionStore) {}

	public async one(workoutData: NewWorkoutModel): Promise<number | null> {
		const userId = this.sessionStore.currentlyManagedUser$.getValue()?.id;

		if (!userId) {
			return null;
		}

		const result: NewWorkout = {
			date: workoutData.date,
			sets: workoutData.exercises.flatMap((data, idx) => {
				const lines = data.program.replace(/\r\n|\r|\n/g, ' ').split(' ');

				return lines.map(line => {
					const [work, weight] = line.split('@');
					const [sets, reps] = work.split('x');

					return {
						exerciseId: data.code,
						name: data.exercise,
						order: idx,
						sets: Number(sets),
						weight: Number(weight),
						reps: Number(reps),
					};
				});
			}),
		};

		return this.workouts.create({ userId, ...result });
	}
}
