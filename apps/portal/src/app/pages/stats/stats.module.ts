import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatsComponent } from './stats.component';
import { routes } from './stats.routes';
import { RouterModule } from '@angular/router';

@NgModule({
	imports: [RouterModule.forChild(routes), CommonModule],
	declarations: [StatsComponent],
})
export class StatsModule {}
