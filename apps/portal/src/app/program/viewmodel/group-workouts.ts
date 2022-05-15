import { Injectable } from '@angular/core';
import { Set, Workout } from '@training-log/contracts';
import { DateTime } from 'luxon';
import { TrainingSession, TrainingWeek, TrainingYear } from './types';

@Injectable()
export class ProgramViewmodel {
	public groupAll(workouts: Workout[]): TrainingYear[] {
		const byYear = groupBy(workouts, one => DateTime.fromJSDate(one.date).weekYear);
		console.log(workouts);
		console.log(byYear);

		const result = byYear
			.map(([year, workouts]) => {
				const workoutsByWeek = groupBy(workouts, one => DateTime.fromJSDate(one.date).weekNumber);

				return {
					year: Number(year),
					weeks: workoutsByWeek.map(([week, workouts]) => ({
						week: Number(week),
						sessions: workouts.map(one => this.sessionFrom(one)).sort(byDateASC),
					})),
				};
			})
			.sort(byYearDESC);

		return result;
	}

	public upsertInPlace(workout: Workout, models: TrainingYear[]): void {
		const newWorkoutYear = DateTime.fromJSDate(workout.date).weekYear;
		const newWorkoutWeek = DateTime.fromJSDate(workout.date).weekNumber;

		const existingYear = models.find(one => one.year === newWorkoutYear);

		if (!existingYear) {
			models.push({
				year: newWorkoutYear,
				weeks: [
					{
						week: newWorkoutWeek,
						sessions: [this.sessionFrom(workout)],
					},
				],
			});
			models.sort(byYearDESC);
			return;
		}

		const existingWeek = existingYear.weeks.find(one => one.week === newWorkoutWeek);

		if (!existingWeek) {
			existingYear.weeks.push({
				week: newWorkoutWeek,
				sessions: [this.sessionFrom(workout)],
			});
			existingYear.weeks.sort(byWeekDESC);
			return;
		}

		existingWeek.sessions.push(this.sessionFrom(workout));
		existingWeek.sessions.sort(byDateASC);
	}

	private sessionFrom(workout: Workout): TrainingSession {
		const setsByExercise: Record<string, Set[]> = {};

		for (const set of workout.sets) {
			if (!setsByExercise[set.exerciseName]) {
				setsByExercise[set.exerciseName] = [];
			}

			setsByExercise[set.exerciseName].push(set);
		}

		return {
			date: new Date(workout.date).toISOString(),
			comment: workout.comment ?? undefined,
			exercises: Object.entries(setsByExercise).map(([k, v]) => ({ name: k, sets: v })),
		};
	}
}

function byYearDESC(p: TrainingYear, n: TrainingYear) {
	return n.year - p.year;
}

function byWeekDESC(p: TrainingWeek, n: TrainingWeek) {
	return n.week - p.week;
}

function byDateASC(p: TrainingSession, n: TrainingSession) {
	return p.date > n.date ? 1 : -1;
}

function groupBy<E, H>(items: E[], hashFn: (one: E) => H): [H, E[]][] {
	const result = new Map();

	for (const one of items) {
		const hash = hashFn(one);

		if (!result.has(hash)) {
			result.set(hash, []);
		}

		result.get(hash).push(one);
	}

	return Array.from(result) as [H, E[]][];
}
