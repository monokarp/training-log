import { Injectable } from '@angular/core';
import { AppRoutes } from '../app.routes.enum';
import { Trainees } from '../data/trainees';
import { MenuStore } from './menu.store';

@Injectable()
export class MenuService {
	constructor(private trainees: Trainees, private menuStore: MenuStore) {}

	public async load() {
		this.menuStore.tabs$.next([
			{ id: AppRoutes.Program, text: 'Program' },
			{ id: AppRoutes.Stats, text: 'Stats' },
			{ id: AppRoutes.Admin, text: 'Admin' },
		]);

		this.menuStore.trainees$.next(await this.trainees.all());
	}
}
