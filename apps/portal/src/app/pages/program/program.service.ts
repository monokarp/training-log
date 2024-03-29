import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ExerciseWithPB } from '@training-log/contracts';
import { firstValueFrom } from 'rxjs';
import { Exercises } from '../../shared/data/exercises';
import { Workouts } from '../../shared/data/workouts';
import { SessionStore } from '../login/session.store';
import { CreateSessionComponent } from './create-session/create-session.component';
import { CreateSession } from './create-session/create-session.service';
import { ProgramStore } from './program.store';
import { ProgramViewmodel } from './viewmodel/group-workouts';
import { NewWorkoutModel } from './viewmodel/types';

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
		const user = this.sessionStore.currentlyManagedUser$.getValue();

		if (user) {
			this.programStore.models$.next(this.viewmodel.groupAll(await this.workouts.for(user.id)));
		}
	}

	public async createNewSession(): Promise<void> {
		const trainee = this.sessionStore.currentlyManagedUser$.getValue();

		if (!trainee) {
			return;
		}

		const result = await firstValueFrom(
			this.dialog
				.open<CreateSessionComponent, ExerciseWithPB[], NewWorkoutModel>(CreateSessionComponent, {
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
				const newWorkout = await this.workouts.one(newWorkoutId, trainee.id);

				if (newWorkout) {
					const models = this.programStore.models$.getValue();

					this.viewmodel.upsertInPlace(newWorkout, models);

					this.programStore.models$.next(models);
				}
			}
		}
	}
}
