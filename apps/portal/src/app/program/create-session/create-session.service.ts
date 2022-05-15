import { Injectable } from '@angular/core';
import { CreateWorkoutData } from '@training-log/contracts';
import { SessionStore } from '../../login/session.store';
import { Workouts } from '../../data/workouts';
import { NewWorkout } from '../viewmodel/types';

@Injectable()
export class CreateSession {
	constructor(private workouts: Workouts, private sessionStore: SessionStore) {}

	public async one(workoutData: NewWorkout): Promise<number | null> {
		const username = this.sessionStore.activeUser$.getValue()?.id;

		if (!username) {
			return null;
		}

		const result: CreateWorkoutData = {
			date: workoutData.date,
			userId: username,
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

		return this.workouts.create(result);
	}
}
