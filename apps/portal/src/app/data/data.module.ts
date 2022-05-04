import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { Trainees } from './trainees';

@NgModule({
	imports: [CommonModule, SharedModule],
	providers: [Trainees],
})
export class DataModule {}
