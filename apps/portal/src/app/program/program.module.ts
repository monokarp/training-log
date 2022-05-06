import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgramComponent } from './program.component';
import { RouterModule } from '@angular/router';
import { routes } from './program.routes';
import { ProgramService } from './program.service';
import { ProgramStore } from './program.store';
import { DataModule } from '../data/data.module';
import { MaterialModule } from '../material/material.module';
import { ProgramViewmodel } from './viewmodel/group-workouts';

@NgModule({
	imports: [RouterModule.forChild(routes), CommonModule, DataModule, MaterialModule],
	providers: [ProgramService, ProgramStore, ProgramViewmodel],
	declarations: [ProgramComponent],
})
export class ProgramModule {}
