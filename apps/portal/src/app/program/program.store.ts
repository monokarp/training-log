import { Injectable } from '@angular/core';
import { Workout } from '@training-log/contracts';
import { BehaviorSubject } from 'rxjs';
import { TrainingWeek } from './types/training-week';

@Injectable()
export class ProgramStore {
	public readonly trainingWeeks$ = new BehaviorSubject<TrainingWeek[]>([]);
}
