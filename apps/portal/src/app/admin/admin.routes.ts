import { Routes } from '@angular/router';
import { childroutes } from './admin-child.routes';
import { AdminComponent } from './admin.component';

export const routes: Routes = [
	{
		path: '',
		component: AdminComponent,
		children: childroutes,
	},
];
