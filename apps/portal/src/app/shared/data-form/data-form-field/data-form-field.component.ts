import { Component, HostBinding, Input } from '@angular/core';

@Component({
	selector: 'portal-data-form-field',
	templateUrl: './data-form-field.component.html',
	styleUrls: ['./data-form-field.component.scss'],
})
export class DataFormFieldComponent {
	@HostBinding('class') @Input() type: 'standard' | 'footer' = 'standard';
}
