import { Routes } from '@angular/router';
import { AdminRoutes } from './admin.routes.enum';
import { ExercisesComponent } from './exercises/exercises.component';
import { PreferencesComponent } from './preferences/preferences.component';
import { TranslationsComponent } from './translations/translations.component';

export const childroutes: Routes = [
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
	{
		path: '',
		redirectTo: AdminRoutes.Exercises,
		pathMatch: 'full',
	},
];
