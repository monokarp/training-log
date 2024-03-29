import { Injectable } from '@angular/core';
import { ExerciseType } from '@training-log/contracts';
import { SessionStore } from '../../login/session.store';
import { TlNotification } from '../../../ui-components/tl-form/tl-notification';
import { ExercisesStore } from './exercise.store';
import { Exercises } from '../../../shared/data/exercises';

@Injectable()
export class ExerciseService {
	constructor(
		private exerciseStore: ExercisesStore,
		private exercises: Exercises,
		private sessionStore: SessionStore,
		private notification: TlNotification,
	) {}

	public async loadStore() {
		const user = this.sessionStore.currentlyManagedUser$.getValue();

		if (user) {
			const entitites = await this.exercises.allFor(user.id);
			this.exerciseStore.exercises$.next(entitites.sort(byIdASC));
		}
	}

	public valudateNew(id: string): boolean {
		return !this.exerciseStore.exercises$.getValue().find(one => one.id === id);
	}

	public async createNew(id: string, name: string) {
		const user = this.sessionStore.currentlyManagedUser$.getValue();

		if (user) {
			const result = await this.exercises.create({
				id,
				name,
				localeCode: user.localeCode,
				userId: user.id,
			});

			if (result) {
				const entitites = this.exerciseStore.exercises$.getValue();

				entitites.push({ id: result, name });

				this.exerciseStore.exercises$.next(entitites.sort(byIdASC));
			}
		}
	}

	public async delete(id: string) {
		const user = this.sessionStore.currentlyManagedUser$.getValue();

		if (user) {
			const result = await this.exercises.delete(id, user.id);

			if (!result) {
				const entitites = this.exerciseStore.exercises$.getValue();

				this.exerciseStore.exercises$.next(entitites.filter(one => one.id !== id).sort(byIdASC));
			} else {
				this.notification.warn(result);
			}
		}
	}
}

function byIdASC(p: ExerciseType, n: ExerciseType) {
	return p.id > n.id ? 1 : -1;
}
