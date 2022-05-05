import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgramComponent } from './program.component';
import { RouterModule } from '@angular/router';
import { routes } from './program.routes';
import { ProgramService } from './program.service';
import { ProgramStore } from './program.store';
import { DataModule } from '../data/data.module';

@NgModule({
	imports: [RouterModule.forChild(routes), CommonModule, DataModule],
	providers: [ProgramService, ProgramStore],
	declarations: [ProgramComponent],
})
export class ProgramModule {}
