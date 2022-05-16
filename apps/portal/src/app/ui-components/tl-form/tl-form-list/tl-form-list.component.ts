import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'tl-form-list',
	templateUrl: './tl-form-list.component.html',
	styleUrls: ['./tl-form-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TlFormListComponent {}
