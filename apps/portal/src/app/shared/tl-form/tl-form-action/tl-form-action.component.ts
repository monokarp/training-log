import { Component, Input } from '@angular/core';

@Component({
	selector: 'tl-form-action',
	templateUrl: './data-form-action.component.html',
	styleUrls: ['./data-form-action.component.scss'],
})
export class TlFormActionComponent {
	@Input() icon: string | undefined;

	@Input() text: string | undefined;
}
