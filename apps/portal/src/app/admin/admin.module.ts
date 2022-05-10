import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatComponentsModule } from '../material/mat-components.module';
import { SharedModule } from '../shared/shared.module';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin.routing.module';
import { ExercisesComponent } from './exercises/exercises.component';
import { PreferencesComponent } from './preferences/preferences.component';
import { TranslationsComponent } from './translations/translations.component';

@NgModule({
	imports: [CommonModule, SharedModule, MatComponentsModule, AdminRoutingModule],
	declarations: [AdminComponent, ExercisesComponent, TranslationsComponent, PreferencesComponent],
})
export class AdminModule {}
