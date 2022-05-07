import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { firstValueFrom } from 'rxjs';
import { Exercises } from '../data/exercises';
import { Workouts } from '../data/workouts';
import { MenuStore } from '../menu/menu.store';
import { CreateSessionComponent } from './create-session/create-session.component';
import { CreateSession } from './create-session/create-session.service';
import { ProgramStore } from './program.store';
import { ProgramViewmodel } from './viewmodel/group-workouts';
import { NewWorkout } from './viewmodel/types';
import { Exercise } from '@training-log/contracts';

@Injectable()
export class ProgramService {
	constructor(
		private workouts: Workouts,
		private programStore: ProgramStore,
		private viewmodel: ProgramViewmodel,
		private dialog: MatDialog,
		private createSession: CreateSession,
		private menuStore: MenuStore,
		private exercises: Exercises,
	) {}

	public async load(username: string): Promise<void> {
		// TODO set selected trainee (from url)
		this.programStore.trainingWeeks$.next(this.viewmodel.groupAll(await this.workouts.for(username)));
	}

	public async createNewSession(): Promise<void> {
		const trainee = this.menuStore.selectedTrainee$.getValue();

		if (!trainee) {
			return;
		}

		const result = await firstValueFrom(
			this.dialog
				.open<CreateSessionComponent, Exercise[], NewWorkout>(CreateSessionComponent, {
					disableClose: true,
					autoFocus: false,
					data: await this.exercises.for(trainee.username),
				})
				.afterClosed(),
		);

		if (result) {
			// TODO receive an id instead and upsert single entity
			if (this.createSession.one(result)) {
				return this.load(trainee.username);
			}
		}
	}
}
