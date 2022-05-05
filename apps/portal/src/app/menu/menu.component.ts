import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map, tap } from 'rxjs/operators';
import { AppRoutes } from '../app.routes.enum';
import { NavigationService } from '../shared/navigation.service';
import { isNavigationEnd } from '../shared/type-guards/is-navigation-end';
import { isNonEmptyString } from '../shared/type-guards/is-string';
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

	constructor(
		private router: Router,
		private menuService: MenuService,
		public menuStore: MenuStore,
		private navigation: NavigationService,
	) {}

	public ngOnInit(): void {
		// TODO Move to route resolution?
		this.menuService.load();
	}

	public onTraineeSelect(event: MatSelectChange) {
		this.menuStore.selectedTrainee$.next(event.value);

		this.navigation.programFor(event.value.username);
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
