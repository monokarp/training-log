import { Injectable } from '@angular/core';
import { Workouts } from '../data/workouts';
import { ProgramStore } from './program.store';
import { ProgramViewmodel } from './viewmodel/group-workouts';

@Injectable()
export class ProgramService {
	constructor(private workouts: Workouts, private programStore: ProgramStore, private viewmodel: ProgramViewmodel) {}

	public async load(username: string): Promise<void> {
		this.programStore.trainingWeeks$.next(this.viewmodel.groupAll(await this.workouts.for(username)));
	}
}
