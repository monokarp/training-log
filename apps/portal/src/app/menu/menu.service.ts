import { Injectable } from '@angular/core';
import { AppRoutes } from '../app.routes.enum';
import { AuthService } from '../auth/auth.service';
import { SessionStore } from '../shared/session.store';
import { MenuStore } from './menu.store';

@Injectable()
export class MenuService {
	constructor(private menuStore: MenuStore, private authService: AuthService, private sessionStore: SessionStore) {}

	public async load() {
		this.menuStore.tabs$.next([
			{ id: AppRoutes.Program, text: 'Program' },
			{ id: AppRoutes.Stats, text: 'Stats' },
			{ id: AppRoutes.Admin, text: 'Admin' },
		]);
	}

	public async login(userId: string): Promise<boolean> {
		const user = await this.authService.login(userId);

		if (user) {
			this.sessionStore.activeUser$.next(user);
		}

		return !!user;
	}
}
