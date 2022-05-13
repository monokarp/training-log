import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'tl-form-container',
	templateUrl: './tl-form-container.component.html',
	styleUrls: ['./tl-form-container.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TlFormContainerComponent {}
