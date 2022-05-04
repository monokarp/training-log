import { Injectable } from '@angular/core';
import { Trainees } from '../data/trainees';
import { MenuStore } from './menu.store';

@Injectable()
export class MenuService {
	constructor(private trainees: Trainees, private menuStore: MenuStore) {}

	public async load() {
		this.menuStore.tabs$.next(['Program', 'Stats', 'Admin']);

		this.menuStore.trainees$.next(await this.trainees.all());
	}
}
