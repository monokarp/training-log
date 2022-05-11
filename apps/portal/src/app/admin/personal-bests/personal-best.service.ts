import { Injectable } from '@angular/core';
import { PersonalBests } from '../../data/personal-bests';
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
		const user = this.sessionStore.activeUser$.getValue();

		if (user) {
			const entitites = await this.personalBests.allFor(user.id, 'squat');
			this.store.personalBests$.next(entitites);
		}
	}
}
