import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { routes } from './admin.routes';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ExercisesComponent } from './exercises/exercises.component';
import { TranslationsComponent } from './translations/translations.component';
import { PreferencesComponent } from './preferences/preferences.component';
import { MatComponentsModule } from '../material/mat-components.module';

@NgModule({
	imports: [RouterModule.forChild(routes), CommonModule, SharedModule, MatComponentsModule],
	declarations: [AdminComponent, ExercisesComponent, TranslationsComponent, PreferencesComponent],
})
export class AdminModule {}
