import { Injectable } from '@angular/core';
import { DateTime } from 'luxon';
import { Workouts } from '../data/workouts';
import { ProgramStore } from './program.store';
import { TrainingWeek } from './types/training-week';

@Injectable()
export class ProgramService {
	constructor(private workouts: Workouts, private programStore: ProgramStore) {}

	public async load(username: string): Promise<void> {
		const result: TrainingWeek[] = [];

		for (const one of await this.workouts.for(username)) {
			const week = DateTime.fromISO(one.date).weekNumber;

			let currentWeek: TrainingWeek | undefined = result[result.length - 1];

			if (currentWeek?.week !== week) {
				currentWeek = { week, sessions: [] };
				result.push(currentWeek);
			}

			currentWeek.sessions.push(one);
		}

		this.programStore.trainingWeeks$.next(result);
	}
}
