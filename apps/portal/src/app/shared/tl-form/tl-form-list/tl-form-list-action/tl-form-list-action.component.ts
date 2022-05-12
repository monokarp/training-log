import { Component, Input } from '@angular/core';

@Component({
	selector: 'tl-form-list-action',
	templateUrl: './data-form-list-action.component.html',
	styleUrls: ['./data-form-list-action.component.scss'],
})
export class TlFormListActionComponent {
	@Input() icon: string | undefined;
}
