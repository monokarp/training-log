import { Injectable } from '@angular/core';
import { UserWithPreferences } from '@training-log/contracts';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class SessionStore {
	public readonly activeUser$ = new BehaviorSubject<UserWithPreferences | null>(null);
}
