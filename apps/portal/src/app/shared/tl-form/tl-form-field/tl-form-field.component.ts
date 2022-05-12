import { Component, HostBinding, Input } from '@angular/core';

@Component({
	selector: 'tl-form-field',
	templateUrl: './data-form-field.component.html',
	styleUrls: ['./data-form-field.component.scss'],
})
export class TlFormFieldComponent {
	@HostBinding('class') @Input() type: 'standard' | 'footer' = 'standard';
}
