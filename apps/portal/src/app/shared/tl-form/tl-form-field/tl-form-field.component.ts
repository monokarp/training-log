import { Component, HostBinding, Input } from '@angular/core';

@Component({
	selector: 'tl-form-field',
	templateUrl: './tl-form-field.component.html',
	styleUrls: ['./tl-form-field.component.scss'],
})
export class TlFormFieldComponent {
	@HostBinding('class') @Input() type: 'standard' | 'footer' = 'standard';
}
