import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Workouts } from './workouts';
import { Exercises } from './exercises';
import { PersonalBests } from './personal-bests';
import { Translations } from './translations';
import { Preferences } from './preferences';
import { CoreModule } from '../core/core.module';

@NgModule({
	imports: [CommonModule, CoreModule],
	providers: [Workouts, Exercises, PersonalBests, Translations, Preferences],
})
export class DataModule {}
