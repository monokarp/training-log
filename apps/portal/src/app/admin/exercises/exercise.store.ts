import { Injectable } from '@angular/core';
import { ExerciseType } from '@training-log/contracts';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class ExercisesStore {
	public readonly exercises$ = new BehaviorSubject<ExerciseType[]>([]);
}
