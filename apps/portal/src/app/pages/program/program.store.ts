import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TrainingYear } from './viewmodel/types';

@Injectable()
export class ProgramStore {
	public readonly models$ = new BehaviorSubject<TrainingYear[]>([]);
}
