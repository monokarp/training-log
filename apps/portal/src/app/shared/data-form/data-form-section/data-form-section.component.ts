import { Component, HostBinding, Input } from '@angular/core';

@Component({
	selector: 'portal-data-form-section',
	templateUrl: './data-form-section.component.html',
	styleUrls: ['./data-form-section.component.scss'],
})
export class DataFormSectionComponent {
	@HostBinding('class') @Input() type: 'form' | 'list' | 'standard' = 'standard';
}
