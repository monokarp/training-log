import { Component, Input } from '@angular/core';

@Component({
	selector: 'tl-form-list-action',
	templateUrl: './tl-form-list-action.component.html',
	styleUrls: ['./tl-form-list-action.component.scss'],
})
export class TlFormListActionComponent {
	@Input() icon: string | undefined;
}
