import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CoreModule } from '../../shared/core/core.module';
import { DataModule } from '../../shared/data/data.module';
import { CommonUiModule } from '../../ui-components/common-ui/common-ui.module';
import { MatComponentsModule } from '../../ui-components/material/mat-components.module';
import { MatFormsModule } from '../../ui-components/material/mat-forms.module';
import { TlFormModule } from '../../ui-components/tl-form/tl-form.module';
import { CreateSessionComponent } from './create-session/create-session.component';
import { CreateSession } from './create-session/create-session.service';
import { ProgramComponent } from './program.component';
import { routes } from './program.routes';
import { ProgramService } from './program.service';
import { ProgramStore } from './program.store';
import { ProgramViewmodel } from './viewmodel/group-workouts';
import { WorkoutCardComponent } from './workout-card/workout-card.component';

@NgModule({
	imports: [
		RouterModule.forChild(routes),
		CommonModule,
		DataModule,
		MatComponentsModule,
		MatFormsModule,
		TlFormModule,
		CoreModule,
		CommonUiModule,
	],
	providers: [ProgramService, ProgramStore, ProgramViewmodel, CreateSession],
	declarations: [ProgramComponent, CreateSessionComponent, WorkoutCardComponent],
})
export class ProgramModule {}
