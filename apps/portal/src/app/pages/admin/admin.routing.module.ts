import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminRoutes } from './admin.routes.enum';
import { ExercisesComponent } from './exercises/exercises.component';
import { PersonalBestComponent } from './personal-bests/personal-best.component';
import { PreferencesComponent } from './preferences/preferences.component';
import { TraineesComponent } from './trainees/trainees.component';
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
				component: ExercisesComponent,
			},
			{
				path: AdminRoutes.PersonalBests,
				component: PersonalBestComponent,
			},
			{
				path: AdminRoutes.Translations,
				component: TranslationsComponent,
			},
			{
				path: AdminRoutes.Preferences,
				component: PreferencesComponent,
			},
			{
				path: AdminRoutes.Trainees,
				component: TraineesComponent,
			},
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class AdminRoutingModule {}
