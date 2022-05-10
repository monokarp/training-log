import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutes } from './app.routes.enum';

const routes: Routes = [
	{
		path: '',
		redirectTo: AppRoutes.Program,
		pathMatch: 'full',
	},
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
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
