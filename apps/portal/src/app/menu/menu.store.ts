import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class MenuStore {
	public readonly tabs$ = new BehaviorSubject<{ id: string; text: string }[]>([]);
}
