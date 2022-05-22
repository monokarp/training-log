import { Injectable } from '@angular/core';
import { PersonalBestData } from '@training-log/contracts';
import { PersonalBests } from '../../../shared/data/personal-bests';
import { SessionStore } from '../../login/session.store';
import { PersonalBestStore } from './personal-best.store';

@Injectable()
export class PersonalBestService {
	constructor(
		private sessionStore: SessionStore,
		private personalBests: PersonalBests,
		private store: PersonalBestStore,
	) {}

	public async loadStore() {
		const user = this.sessionStore.currentlyManagedUser$.getValue();

		if (user) {
			const entitites = await this.personalBests.allFor(user.id);
			this.store.personalBests$.next(entitites);
		}
	}

	public async create(data: PersonalBestData) {
		const user = this.sessionStore.currentlyManagedUser$.getValue();

		if (user) {
			const result = await this.personalBests.create({ userId: user.id, ...data });

			if (result) {
				const entitites = this.store.personalBests$.getValue();

				entitites.push({
					id: result,
					...data,
				});

				this.store.personalBests$.next(entitites);
			}
		}
	}

	public async delete(id: number) {
		const user = this.sessionStore.currentlyManagedUser$.getValue();

		if (user) {
			const result = await this.personalBests.delete(id, user.id);

			if (result) {
				const entitites = this.store.personalBests$.getValue();

				this.store.personalBests$.next(entitites.filter(one => one.id !== id));
			}
		}
	}
}
