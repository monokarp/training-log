import { Injectable } from '@angular/core';
import { ManagementRights } from '../../../shared/data/management-rights';
import { TlNotification } from '../../../ui-components/tl-form/tl-notification';
import { SessionStore } from '../../login/session.store';
import { TraineesStore } from './trainees.store';

@Injectable()
export class TraineesService {
	constructor(
		private managementRights: ManagementRights,
		private traineesStore: TraineesStore,
		private sessionStore: SessionStore,
		private notification: TlNotification,
	) {}

	public async loadStore() {
		const user = this.sessionStore.activeUser$.getValue();

		if (user) {
			this.traineesStore.currentUserRights$.next(await this.managementRights.for(user.id));
		}
	}

	public async addCoach(userId: string): Promise<void> {
		const mgmtRights = this.traineesStore.currentUserRights$.getValue();

		if (mgmtRights.coaches.find(one => one.id === userId)) {
			this.notification.warn('Please select a user from the list');
			return;
		}

		const user = this.sessionStore.activeUser$.getValue();

		if (userId === user?.id) {
			this.notification.warn('You can manage your own profile by default');
			return;
		}

		if (user) {
			const newCoach = await this.managementRights.add(userId, user.id);

			if (newCoach) {
				const data = this.traineesStore.currentUserRights$.getValue();

				data.coaches.push(newCoach);

				this.traineesStore.currentUserRights$.next(data);
			}
		}
	}

	public async revokeCoach(userId: string): Promise<void> {
		const mgmtRights = this.traineesStore.currentUserRights$.getValue();

		if (!mgmtRights.coaches.find(one => one.id === userId)) {
			this.notification.warn('Please select a user from the list');
			return;
		}

		const user = this.sessionStore.activeUser$.getValue();

		if (user) {
			if (await this.managementRights.revoke(userId, user.id)) {
				const data = this.traineesStore.currentUserRights$.getValue();

				data.coaches = data.coaches.filter(one => one.id !== userId);

				this.traineesStore.currentUserRights$.next(data);
			}
		}
	}

	public async revokeTrainee(userId: string): Promise<void> {
		const mgmtRights = this.traineesStore.currentUserRights$.getValue();

		if (!mgmtRights.trainees.find(one => one.id === userId)) {
			this.notification.warn('Please select a user from the list');
			return;
		}

		const user = this.sessionStore.activeUser$.getValue();

		if (user) {
			if (await this.managementRights.revoke(user.id, userId)) {
				const data = this.traineesStore.currentUserRights$.getValue();

				data.trainees = data.trainees.filter(one => one.id !== userId);

				this.traineesStore.currentUserRights$.next(data);

				this.unsetFromTrainees(userId);

				this.unsetActivelyManaged(userId);
			}
		}
	}

	private unsetFromTrainees(userId: string) {
		const trainees = this.sessionStore.trainees$.getValue();

		this.sessionStore.trainees$.next(trainees.filter(one => one.id !== userId));
	}

	private unsetActivelyManaged(userId: string) {
		const currentlyManaged = this.sessionStore.currentlyManagedUser$.getValue();

		if (currentlyManaged?.id === userId) {
			this.sessionStore.currentlyManagedUser$.next(null);
		}
	}
}
