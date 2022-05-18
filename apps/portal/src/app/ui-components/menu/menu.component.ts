import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { isNotNull } from '@training-log/shared';
import { combineLatest } from 'rxjs';
import { filter, map, startWith } from 'rxjs/operators';
import { AppRoutes } from '../../app.routes.enum';
import { SessionStore } from '../../pages/login/session.store';
import { NavigationService } from '../../shared/core/navigation.service';
import { isNavigationEnd } from '../../shared/core/type-guards/is-navigation-end';
import { MenuService } from './menu.service';

@Component({
	selector: 'portal-menu',
	templateUrl: './menu.component.html',
	styleUrls: ['./menu.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuComponent {
	public currentPage$ = this.router.events.pipe(
		filter(isNavigationEnd),
		map(event => event.urlAfterRedirects),
	);

	public userData$ = combineLatest([
		this.sessionStore.activeUser$.pipe(filter(isNotNull)),
		this.sessionStore.currentlyManagedUser$.pipe(filter(isNotNull)),
	]).pipe(
		map(([user, trainee]) => ({ user, trainee })),
		startWith(null),
	);

	public readonly routes = [
		{ id: AppRoutes.Login, text: 'Login' },
		{ id: AppRoutes.Program, text: 'Program' },
		{ id: AppRoutes.Stats, text: 'Stats' },
		{ id: AppRoutes.Admin, text: 'Admin' },
	];

	constructor(
		private router: Router,
		public menuService: MenuService,
		private navigation: NavigationService,
		public sessionStore: SessionStore,
	) {}

	public onTabSelect(value: string) {
		switch (value) {
			case AppRoutes.Login:
			case AppRoutes.Program:
			case AppRoutes.Stats:
			case AppRoutes.Admin:
				return this.navigation.open(value);
			default:
				throw new Error('Unrecognized page in navbar');
		}
	}
}
