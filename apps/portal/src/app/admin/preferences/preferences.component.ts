import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'portal-preferences',
	templateUrl: './preferences.component.html',
	styleUrls: ['./preferences.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PreferencesComponent {}
