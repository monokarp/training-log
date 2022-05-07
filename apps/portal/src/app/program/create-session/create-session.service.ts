import { Injectable } from '@angular/core';
import { CreateWorkoutData } from '@training-log/contracts';
import { Workouts } from '../../data/workouts';
import { MenuStore } from '../../menu/menu.store';
import { NewWorkout } from '../viewmodel/types';

@Injectable()
export class CreateSession {
	constructor(private workouts: Workouts, private menuStore: MenuStore) {}

	public one(workoutData: NewWorkout) {
		const username = this.menuStore.selectedTrainee$.getValue()?.username;

		if (!username) {
			return;
		}

		const result: CreateWorkoutData = {
			date: workoutData.date.toISOString(),
			traineeUsername: username,
			sets: workoutData.exercises.flatMap((data, idx) => {
				const lines = data.program.replace(/\r\n|\r|\n/g, ' ').split(' ');

				return lines.map(line => {
					const [work, weight] = line.split('@');
					const [sets, reps] = work.split('x');

					return {
						name: data.code,
						order: idx,
						multiple: Number(sets),
						weight: Number(weight),
						reps: Number(reps),
					};
				});
			}),
		};

		return this.workouts.create(result);
	}
}
