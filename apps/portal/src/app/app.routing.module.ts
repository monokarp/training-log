import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutes } from './app.routes.enum';
import { LoginComponent } from './pages/login/login.component';
import { UserLoggedIn } from './shared/auth/auth.route-guard';

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
		loadChildren: () => import('./pages/program/program.module').then(m => m.ProgramModule),
		canActivate: [UserLoggedIn],
	},
	{
		path: AppRoutes.Stats,
		loadChildren: () => import('./pages/stats/stats.module').then(m => m.StatsModule),
		canActivate: [UserLoggedIn],
	},
	{
		path: AppRoutes.Admin,
		loadChildren: () => import('./pages/admin/admin.module').then(m => m.AdminModule),
		canActivate: [UserLoggedIn],
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
