import { Injectable } from '@angular/core';
import { Workout } from '@training-log/contracts';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class ProgramStore {
	public readonly workouts$ = new BehaviorSubject<Workout[]>([]);
}
