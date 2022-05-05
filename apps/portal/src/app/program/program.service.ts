import { Injectable } from '@angular/core';
import { Workouts } from '../data/workouts';
import { ProgramStore } from './program.store';

@Injectable()
export class ProgramService {
	constructor(private workouts: Workouts, private programStore: ProgramStore) {}

	public async load(username: string): Promise<void> {
		this.programStore.workouts$.next(await this.workouts.for(username));
	}
}
