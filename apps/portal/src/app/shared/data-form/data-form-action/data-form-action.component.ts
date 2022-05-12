import { Component, Input } from '@angular/core';

@Component({
	selector: 'portal-data-form-action',
	templateUrl: './data-form-action.component.html',
	styleUrls: ['./data-form-action.component.scss'],
})
export class DataFormActionComponent {
	@Input() icon: string | undefined;

	@Input() text: string | undefined;
}
