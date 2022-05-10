import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AppRoutes } from '../app.routes.enum';
import { SessionStore } from './session.store';

@Injectable()
export class NavigationService {
	constructor(private router: Router, public sessionStore: SessionStore) {}

	public programFor(username: string) {
		return this.router.navigate([AppRoutes.Program, username]);
	}

	public open(page: AppRoutes) {
		return this.router.navigate([page]);
	}
}
