import { Injectable } from '@angular/core';
import { ExerciseType } from '@training-log/contracts';
import { Exercises } from '../../data/exercises';
import { SessionStore } from '../../login/session.store';
import { ExercisesStore } from './exercise.store';

@Injectable()
export class ExerciseService {
	constructor(
		private exerciseStore: ExercisesStore,
		private exercises: Exercises,
		private sessionStore: SessionStore,
	) {}

	public async loadStore() {
		const user = this.sessionStore.activeUser$.getValue();

		if (user) {
			const entitites = await this.exercises.allFor(user.id);
			this.exerciseStore.exercises$.next(entitites.sort(byIdASC));
		}
	}

	public valudateNew(id: string): boolean {
		return !this.exerciseStore.exercises$.getValue().find(one => one.id === id);
	}

	public async createNew(id: string, name: string) {
		const user = this.sessionStore.activeUser$.getValue();

		if (user) {
			await this.exercises.create({
				id,
				name,
				userId: user.id,
				localeCode: user.localeCode,
			});

			const entitites = this.exerciseStore.exercises$.getValue();

			entitites.push({ id, name, userId: user.id });

			this.exerciseStore.exercises$.next(entitites.sort(byIdASC));
		}
	}

	public async delete(id: string) {
		const user = this.sessionStore.activeUser$.getValue();

		if (user) {
			const result = await this.exercises.delete({
				id,
				userId: user.id,
			});

			if (result) {
				const entitites = this.exerciseStore.exercises$.getValue();

				this.exerciseStore.exercises$.next(entitites.filter(one => one.id !== id).sort(byIdASC));
			}
		}
	}
}

function byIdASC(p: ExerciseType, n: ExerciseType) {
	return p.id > n.id ? 1 : -1;
}
