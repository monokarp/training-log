import { Injectable } from '@angular/core';
import { UserWithPreferences } from '@training-log/contracts';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class SessionStore {
	public readonly currentlyManagedUser$ = new BehaviorSubject<UserWithPreferences | null>(null);
	public readonly activeUser$ = new BehaviorSubject<UserWithPreferences | null>(null);
	public readonly trainees$ = new BehaviorSubject<UserWithPreferences[]>([]);
	public readonly authToken$ = new BehaviorSubject<string | null>(null);
}
