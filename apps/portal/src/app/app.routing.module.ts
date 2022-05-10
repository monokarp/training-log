import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutes } from './app.routes.enum';
import { UserLoggedIn } from './auth/auth.route-guard';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
	{
		path: '',
		redirectTo: AppRoutes.Login,
		pathMatch: 'full',
	},
	{
		path: AppRoutes.Login,
		component: LoginComponent,
	},
	{
		path: AppRoutes.Program,
		loadChildren: () => import('./program/program.module').then(m => m.ProgramModule),
		canActivate: [UserLoggedIn],
	},
	{
		path: AppRoutes.Stats,
		loadChildren: () => import('./stats/stats.module').then(m => m.StatsModule),
		canActivate: [UserLoggedIn],
	},
	{
		path: AppRoutes.Admin,
		loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
		canActivate: [UserLoggedIn],
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
