import { Routes } from '@angular/router';
import { AppRoutes } from './app.routes.enum';

export const routes: Routes = [
	{
		path: AppRoutes.Program,
		loadChildren: () => import('./program/program.module').then(m => m.ProgramModule),
	},
	{
		path: AppRoutes.Stats,
		loadChildren: () => import('./stats/stats.module').then(m => m.StatsModule),
	},
	{
		path: AppRoutes.Admin,
		loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
	},
	{
		path: '',
		redirectTo: AppRoutes.Program,
		pathMatch: 'full',
	},
];
