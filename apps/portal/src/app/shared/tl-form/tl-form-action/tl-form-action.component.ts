import { Component, Input } from '@angular/core';

@Component({
	selector: 'tl-form-action',
	templateUrl: './tl-form-action.component.html',
	styleUrls: ['./tl-form-action.component.scss'],
})
export class TlFormActionComponent {
	@Input() icon: string | undefined;

	@Input() text: string | undefined;
}
