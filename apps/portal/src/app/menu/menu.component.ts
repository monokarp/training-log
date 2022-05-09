import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { AppRoutes } from '../app.routes.enum';
import { SessionStore } from '../shared/session.store';
import { NavigationService } from '../shared/navigation.service';
import { isNavigationEnd } from '../shared/type-guards/is-navigation-end';
import { MenuService } from './menu.service';
import { MenuStore } from './menu.store';

@Component({
	selector: 'portal-menu',
	templateUrl: './menu.component.html',
	styleUrls: ['./menu.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuComponent implements OnInit {
	public currentPage$ = this.router.events.pipe(
		filter(isNavigationEnd),
		map(event => event.urlAfterRedirects),
	);

	public username = new FormControl();

	constructor(
		private router: Router,
		private menuService: MenuService,
		public menuStore: MenuStore,
		private navigation: NavigationService,
		public sessionStore: SessionStore,
	) {}

	public ngOnInit(): void {
		// TODO Move to route resolution?
		this.menuService.load();
	}

	public async onUserSelect() {
		const user = this.sessionStore.activeUser$.getValue();

		if (user) {
			this.username.setValue('');
			this.sessionStore.activeUser$.next(null);
			this.username.enable();
			return;
		}

		if (!this.username.value) {
			return;
		}

		const result = await this.menuService.login(this.username.value);

		if (result) {
			this.username.disable();
		}
	}

	public onTabSelect(value: string) {
		switch (value) {
			case AppRoutes.Program:
			case AppRoutes.Stats:
			case AppRoutes.Admin:
				return this.navigation.open(value);
			default:
				throw new Error('Unrecognized page in navbar');
		}
	}
}
