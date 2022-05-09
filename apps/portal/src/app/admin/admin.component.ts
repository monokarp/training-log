import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { childroutes } from './admin-child.routes';
import { AdminRoutes } from './admin.routes.enum';

@Component({
	selector: 'portal-admin',
	templateUrl: './admin.component.html',
	styleUrls: ['./admin.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminComponent implements OnInit {
	public routes = childroutes.filter(route => !!route.data?.['name']);
	public activeLink: string = AdminRoutes.Exercises;

	constructor(private router: Router) {}

	ngOnInit(): void {
		this.router.navigate([`../${AdminRoutes.Exercises}`]);
	}
}
