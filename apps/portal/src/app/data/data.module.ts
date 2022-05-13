import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { Workouts } from './workouts';
import { Exercises } from './exercises';
import { PersonalBests } from './personal-bests';
import { Translations } from './translations';

@NgModule({
	imports: [CommonModule, SharedModule],
	providers: [Workouts, Exercises, PersonalBests, Translations],
})
export class DataModule {}
