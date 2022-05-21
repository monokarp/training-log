import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
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
import { TlFormModule } from '../../ui-components/tl-form/tl-form.module';
import { TranslationsStore } from './translations/translations.store';
import { TranslationsService } from './translations/translations.service';
import { PreferencesStore } from './preferences/preferences.store';
import { PreferencesService } from './preferences/preferences.service';
import { CoreModule } from '../../shared/core/core.module';
import { MatComponentsModule } from '../../ui-components/material/mat-components.module';
import { MatFormsModule } from '../../ui-components/material/mat-forms.module';
import { CommonUiModule } from '../../ui-components/common-ui/common-ui.module';
import { TraineesComponent } from './trainees/trainees.component';
import { TraineesService } from './trainees/trainees.service';
import { TraineesStore } from './trainees/trainees.store';

@NgModule({
	imports: [
		CommonModule,
		CoreModule,
		MatComponentsModule,
		MatFormsModule,
		AdminRoutingModule,
		TlFormModule,
		CommonUiModule,
	],
	// TODO split children into modules
	declarations: [
		AdminComponent,
		ExercisesComponent,
		TranslationsComponent,
		PreferencesComponent,
		PersonalBestComponent,
		TraineesComponent,
	],
	providers: [
		ExercisesStore,
		ExerciseService,
		PersonalBestService,
		PersonalBestStore,
		TranslationsStore,
		TranslationsService,
		PreferencesStore,
		PreferencesService,
		TraineesService,
		TraineesStore,
	],
})
export class AdminModule {}
