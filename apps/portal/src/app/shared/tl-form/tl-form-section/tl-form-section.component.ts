import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';

@Component({
	selector: 'tl-form-section',
	templateUrl: './tl-form-section.component.html',
	styleUrls: ['./tl-form-section.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TlFormSectionComponent {
	@HostBinding('class') @Input() type: 'form' | 'list' | 'standard' = 'standard';
}
