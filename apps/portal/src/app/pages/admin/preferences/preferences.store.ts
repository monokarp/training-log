import { Injectable } from '@angular/core';
import { WeightUnit } from '@training-log/contracts';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class PreferencesStore {
	public readonly units$ = new BehaviorSubject<WeightUnit[]>([]);
	public readonly locales$ = new BehaviorSubject<string[]>([]);
}
