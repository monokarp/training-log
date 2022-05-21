import { Injectable } from '@angular/core';
import { UserAuthResult } from '@training-log/contracts';
import { AppRoutes } from '../../app.routes.enum';
import { NavigationService } from '../../shared/core/navigation.service';
import { SessionStore } from './session.store';

@Injectable()
export class SessionService {
	constructor(private sessionStore: SessionStore, private navigation: NavigationService) {}

	public login(userData: UserAuthResult) {
		this.sessionStore.activeUser$.next(userData.user);

		this.sessionStore.trainees$.next(userData.trainees);

		this.sessionStore.currentlyManagedUser$.next(userData.user);

		this.sessionStore.authToken$.next(userData.token);
	}

	public logout() {
		this.sessionStore.currentlyManagedUser$.next(null);
		this.sessionStore.activeUser$.next(null);

		this.sessionStore.trainees$.next([]);

		this.sessionStore.authToken$.next(null);

		this.navigation.open(AppRoutes.Login);
	}
}
