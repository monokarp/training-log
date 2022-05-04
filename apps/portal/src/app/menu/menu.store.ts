import { Injectable } from '@angular/core';
import { Trainee } from '@contracts';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class MenuStore {
	public readonly tabs$ = new BehaviorSubject<string[]>([]);
	public readonly trainees$ = new BehaviorSubject<Trainee[]>([]);
	public readonly selectedTrainee$ = new BehaviorSubject<Trainee | null>(null);
}
