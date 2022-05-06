import { Injectable } from '@angular/core';
import { Set, Workout } from '@training-log/contracts';
import { DateTime } from 'luxon';
import { TrainingWeek } from './types';

@Injectable()
export class ProgramViewmodel {
	public groupAll(workouts: Workout[]): TrainingWeek[] {
		const result: TrainingWeek[] = [];

		for (const one of workouts) {
			const week = DateTime.fromISO(one.date).weekNumber;

			let currentWeek: TrainingWeek | undefined = result[result.length - 1];

			if (currentWeek?.week !== week) {
				currentWeek = { week, sessions: [] };
				result.push(currentWeek);
			}

			const setsByExercise: Record<string, Set[]> = {};

			for (const set of one.sets) {
				if (!setsByExercise[set.exerciseName]) {
					setsByExercise[set.exerciseName] = [];
				}

				setsByExercise[set.exerciseName].push(set);
			}

			currentWeek.sessions.push({
				date: one.date,
				comment: one.comment,
				exercises: Object.entries(setsByExercise).map(([k, v]) => ({ name: k, sets: v })),
			});
		}

		return result;
	}
}
