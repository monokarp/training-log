import { Component, Input } from '@angular/core';

@Component({
	selector: 'portal-data-form-list-action',
	templateUrl: './data-form-list-action.component.html',
	styleUrls: ['./data-form-list-action.component.scss'],
})
export class DataFormListActionComponent {
	@Input() icon: string | undefined;
}
