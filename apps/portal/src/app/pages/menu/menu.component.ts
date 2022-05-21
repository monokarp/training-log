import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserWithPreferences } from '@training-log/contracts';
import { isNotNull } from '@training-log/shared';
import { combineLatest } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { AppRoutes } from '../../app.routes.enum';
import { NavigationService } from '../../shared/core/navigation.service';
import { isNavigationEnd } from '../../shared/core/type-guards/is-navigation-end';
import { SessionService } from '../login/session.service';
import { SessionStore } from '../login/session.store';
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

	public trainees$ = combineLatest([
		this.sessionStore.activeUser$.pipe(filter(isNotNull)),
		this.sessionStore.trainees$,
	]).pipe(map(([user, trainees]) => (trainees.length ? [user, ...trainees] : null)));

	constructor(
		private router: Router,
		public menuService: MenuService,
		private navigation: NavigationService,
		public sessionStore: SessionStore,
		private sessionService: SessionService,
	) {}

	public onTraineeSelect(data: { value: UserWithPreferences }) {
		// TODO move to svc? consider reactively updating admin subviews on user change
		this.sessionStore.currentlyManagedUser$.next(data.value);
	}

	public logout() {
		this.sessionService.logout();
	}

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
