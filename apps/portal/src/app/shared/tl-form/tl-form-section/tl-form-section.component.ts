import { Component, HostBinding, Input } from '@angular/core';

@Component({
	selector: 'tl-form-section',
	templateUrl: './data-form-section.component.html',
	styleUrls: ['./data-form-section.component.scss'],
})
export class TlFormSectionComponent {
	@HostBinding('class') @Input() type: 'form' | 'list' | 'standard' = 'standard';
}
