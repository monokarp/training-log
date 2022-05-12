import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DataModule } from '../data/data.module';
import { MatComponentsModule } from '../material/mat-components.module';
import { MatFormsModule } from '../material/mat-forms.module';
import { DataFormModule } from '../shared/data-form/data-form.module';
import { CreateSessionComponent } from './create-session/create-session.component';
import { CreateSession } from './create-session/create-session.service';
import { ProgramComponent } from './program.component';
import { routes } from './program.routes';
import { ProgramService } from './program.service';
import { ProgramStore } from './program.store';
import { ProgramViewmodel } from './viewmodel/group-workouts';

@NgModule({
	imports: [
		RouterModule.forChild(routes),
		CommonModule,
		DataModule,
		MatComponentsModule,
		MatFormsModule,
		DataFormModule,
	],
	providers: [ProgramService, ProgramStore, ProgramViewmodel, CreateSession],
	declarations: [ProgramComponent, CreateSessionComponent],
})
export class ProgramModule {}
