import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { AppRoutes } from '../app.routes.enum';
import { NavigationService } from '../shared/navigation.service';
import { MenuService } from './menu.service';
import { MenuStore } from './menu.store';

@Component({
	selector: 'portal-menu',
	templateUrl: './menu.component.html',
	styleUrls: ['./menu.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuComponent implements OnInit {
	constructor(private menuService: MenuService, public menuStore: MenuStore, private navigation: NavigationService) {}

	public ngOnInit(): void {
		// TODO Move to route resolution?
		this.menuService.load();
	}

	public onTraineeSelect(event: MatSelectChange) {
		this.menuStore.selectedTrainee$.next(event.value);

		this.navigation.programFor(event.value);
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
