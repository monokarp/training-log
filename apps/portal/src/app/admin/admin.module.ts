import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatComponentsModule } from '../material/mat-components.module';
import { MatFormsModule } from '../material/mat-forms.module';
import { SharedModule } from '../shared/shared.module';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin.routing.module';
import { ExerciseService } from './exercises/exercise.service';
import { ExercisesStore } from './exercises/exercise.store';
import { ExercisesComponent } from './exercises/exercises.component';
import { PreferencesComponent } from './preferences/preferences.component';
import { TranslationsComponent } from './translations/translations.component';
import { PersonalBestComponent } from './personal-bests/personal-best.component';
import { PersonalBestService } from './personal-bests/personal-best.service';
import { PersonalBestStore } from './personal-bests/personal-best.store';
import { TlFormModule } from '../shared/tl-form/data-form.module';

@NgModule({
	imports: [CommonModule, SharedModule, MatComponentsModule, MatFormsModule, AdminRoutingModule, TlFormModule],
	declarations: [
		AdminComponent,
		ExercisesComponent,
		TranslationsComponent,
		PreferencesComponent,
		PersonalBestComponent,
	],
	providers: [ExercisesStore, ExerciseService, PersonalBestService, PersonalBestStore],
})
export class AdminModule {}
