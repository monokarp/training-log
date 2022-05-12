import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminRoutes } from './admin.routes.enum';

@Component({
	selector: 'portal-admin',
	templateUrl: './admin.component.html',
	styleUrls: ['./admin.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminComponent {
	public routes = [
		{ path: AdminRoutes.Exercises, name: 'Exercises' },
		{ path: AdminRoutes.PersonalBests, name: 'Personal Bests' },
		{ path: AdminRoutes.Preferences, name: 'Preferences' },
		{ path: AdminRoutes.Translations, name: 'Translations' },
	];
	public activeLink: string = AdminRoutes.Exercises;

	constructor(private router: Router) {}
}
