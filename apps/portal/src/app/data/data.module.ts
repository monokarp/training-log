import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { Trainees } from './trainees';
import { Workouts } from './workouts';
import { Exercises } from './exercises';

@NgModule({
	imports: [CommonModule, SharedModule],
	providers: [Trainees, Workouts, Exercises],
})
export class DataModule {}
