import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AppRoutes } from '../../app.routes.enum';
import { SessionStore } from '../../pages/login/session.store';

@Injectable()
export class MenuService {
	constructor(private sessionStore: SessionStore) {}

	public tabs$(): Observable<{ id: string; text: string }[]> {
		return this.sessionStore.currentlyManagedUser$.pipe(
			map(user =>
				user
					? [
							{ id: AppRoutes.Login, text: 'Login' },
							{ id: AppRoutes.Program, text: 'Program' },
							{ id: AppRoutes.Stats, text: 'Stats' },
							{ id: AppRoutes.Admin, text: 'Admin' },
					  ]
					: [{ id: AppRoutes.Login, text: 'Login' }],
			),
		);
	}
}
