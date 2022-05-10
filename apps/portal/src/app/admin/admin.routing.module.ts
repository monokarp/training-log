import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminRoutes } from './admin.routes.enum';
import { ExercisesComponent } from './exercises/exercises.component';
import { PreferencesComponent } from './preferences/preferences.component';
import { TranslationsComponent } from './translations/translations.component';

export const routes: Routes = [
	{
		path: '',
		component: AdminComponent,
		children: [
			{
				path: '',
				redirectTo: AdminRoutes.Exercises,
				pathMatch: 'full',
			},
			{
				path: AdminRoutes.Exercises,
				data: {
					name: 'Exercises',
				},
				component: ExercisesComponent,
			},
			{
				path: AdminRoutes.Translations,
				data: {
					name: 'Translations',
				},
				component: TranslationsComponent,
			},
			{
				path: AdminRoutes.Preferences,
				data: {
					name: 'Preferences',
				},
				component: PreferencesComponent,
			},
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class AdminRoutingModule {}
