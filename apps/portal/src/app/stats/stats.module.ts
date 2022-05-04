import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatsComponent } from './stats.component';
import { routes } from './stats.routes';
import { RouterModule } from '@angular/router';

@NgModule({
	declarations: [StatsComponent],
	imports: [RouterModule.forRoot(routes), CommonModule],
})
export class StatsModule {}
