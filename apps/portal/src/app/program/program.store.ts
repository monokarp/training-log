import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TrainingWeek } from './viewmodel/types';

@Injectable()
export class ProgramStore {
	public readonly trainingWeeks$ = new BehaviorSubject<TrainingWeek[]>([]);
}
