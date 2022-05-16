import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ExerciseWithPB } from '@training-log/contracts';
import { firstValueFrom } from 'rxjs';
import { SessionStore } from '../login/session.store';
import { Exercises } from '../data/exercises';
import { Workouts } from '../data/workouts';
import { CreateSessionComponent } from './create-session/create-session.component';
import { CreateSession } from './create-session/create-session.service';
import { ProgramStore } from './program.store';
import { ProgramViewmodel } from './viewmodel/group-workouts';
import { NewWorkout } from './viewmodel/types';

@Injectable()
export class ProgramService {
	constructor(
		private workouts: Workouts,
		private programStore: ProgramStore,
		private viewmodel: ProgramViewmodel,
		private dialog: MatDialog,
		private createSession: CreateSession,
		private sessionStore: SessionStore,
		private exercises: Exercises,
	) {}

	public async load(): Promise<void> {
		const user = this.sessionStore.activeUser$.getValue();

		if (user) {
			this.programStore.models$.next(this.viewmodel.groupAll(await this.workouts.for(user.id)));
		}
	}

	public async createNewSession(): Promise<void> {
		const trainee = this.sessionStore.activeUser$.getValue();

		if (!trainee) {
			return;
		}

		const result = await firstValueFrom(
			this.dialog
				.open<CreateSessionComponent, ExerciseWithPB[], NewWorkout>(CreateSessionComponent, {
					disableClose: true,
					autoFocus: false,
					panelClass: 'no-padding',
					data: await this.exercises.includingPersonalBestFor(trainee.id),
				})
				.afterClosed(),
		);

		if (result) {
			const newWorkoutId = await this.createSession.one(result);

			if (newWorkoutId) {
				const newWorkout = await this.workouts.one(newWorkoutId);

				if (newWorkout) {
					const models = this.programStore.models$.getValue();

					this.viewmodel.upsertInPlace(newWorkout, models);

					this.programStore.models$.next(models);
				}
			}
		}
	}
}
