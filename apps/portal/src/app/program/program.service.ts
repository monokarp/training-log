import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { firstValueFrom } from 'rxjs';
import { Workouts } from '../data/workouts';
import { CreateSessionComponent } from './create-session/create-session.component';
import { CreateSession } from './create-session/create-session.service';
import { ProgramStore } from './program.store';
import { ProgramViewmodel } from './viewmodel/group-workouts';

@Injectable()
export class ProgramService {
	constructor(
		private workouts: Workouts,
		private programStore: ProgramStore,
		private viewmodel: ProgramViewmodel,
		private dialog: MatDialog,
		private createSession: CreateSession,
	) {}

	public async load(username: string): Promise<void> {
		this.programStore.trainingWeeks$.next(this.viewmodel.groupAll(await this.workouts.for(username)));
	}

	public async createNewSession(): Promise<void> {
		const result = await firstValueFrom(
			this.dialog
				// TODO define return type
				.open<CreateSessionComponent, unknown | null>(CreateSessionComponent, {
					disableClose: true,
					autoFocus: false,
					// height: '400px',
					// width: '600px',
				})
				.afterClosed(),
		);

		if (result) {
			this.createSession.one(result);
		}
	}
}
