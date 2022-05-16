import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { SessionStore } from '../../login/session.store';
import { PreferencesService } from './preferences.service';
import { PreferencesStore } from './preferences.store';

@Component({
	selector: 'portal-preferences',
	templateUrl: './preferences.component.html',
	styleUrls: ['./preferences.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PreferencesComponent implements OnInit {
	public unit = new FormControl('', [Validators.required]);
	public locale = new FormControl('', [Validators.required]);

	constructor(
		public sessionStore: SessionStore,
		public preferencesStore: PreferencesStore,
		private service: PreferencesService,
	) {}

	public async ngOnInit() {
		await this.service.loadStore();

		const user = this.sessionStore.activeUser$.getValue();

		if (user) {
			this.unit.setValue(user.unit);
			this.locale.setValue(user.localeCode);
		}
	}

	public update() {
		this.service.save({
			unit: this.unit.value,
			localeCode: this.locale.value,
		});
	}
}
