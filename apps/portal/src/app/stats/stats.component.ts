import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'portal-stats',
	templateUrl: './stats.component.html',
	styleUrls: ['./stats.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatsComponent {}
