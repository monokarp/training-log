import { Injectable } from '@angular/core';
import { PersonalBest } from '@training-log/contracts';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class PersonalBestStore {
	public readonly personalBests$ = new BehaviorSubject<PersonalBest[]>([]);
}
