import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AppRoutes } from '../app.routes.enum';
import { MenuStore } from '../menu/menu.store';

@Injectable()
export class NavigationService {
	constructor(private router: Router, private menuStore: MenuStore) {}

	public programFor(username: string) {
		return this.router.navigate([AppRoutes.Program, username]);
	}

	public open(page: AppRoutes) {
		if (page === AppRoutes.Program) {
			const selectedTrainee = this.menuStore.selectedTrainee$.value;

			if (selectedTrainee) {
				return this.router.navigate([page, selectedTrainee.username]);
			}
		}

		return this.router.navigate([page]);
	}
}
