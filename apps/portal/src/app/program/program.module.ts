import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgramComponent } from './program.component';
import { RouterModule } from '@angular/router';
import { routes } from './program.routes';

@NgModule({
	declarations: [ProgramComponent],
	imports: [RouterModule.forRoot(routes), CommonModule],
})
export class ProgramModule {}
