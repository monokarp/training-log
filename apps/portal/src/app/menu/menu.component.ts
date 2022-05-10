import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { AppRoutes } from '../app.routes.enum';
import { SessionStore } from '../login/session.store';
import { NavigationService } from '../shared/navigation.service';
import { isNavigationEnd } from '../shared/type-guards/is-navigation-end';
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
