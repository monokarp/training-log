import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'tl-form-list-item',
	templateUrl: './tl-form-list-item.component.html',
	styleUrls: ['./tl-form-list-item.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TlFormListItemComponent {}
