import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { TlNotification } from '../tl-notification';
import { TlNotificationComponent } from '../tl-notification/tl-notification.component';

@Component({
	selector: 'tl-form-container',
	templateUrl: './tl-form-container.component.html',
	styleUrls: ['./tl-form-container.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TlFormContainerComponent implements AfterViewInit {
	@ViewChild(TlNotificationComponent) ref!: TlNotificationComponent;

	constructor(private notification: TlNotification) {}

	public ngAfterViewInit(): void {
		this.notification.setRef(this.ref);
	}
}
