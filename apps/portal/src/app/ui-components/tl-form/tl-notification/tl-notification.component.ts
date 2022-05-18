import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TlNotificationTheme } from '../tl-notification';

@Component({
	selector: 'tl-notification',
	templateUrl: './tl-notification.component.html',
	styleUrls: ['./tl-notification.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TlNotificationComponent {
	public isDisplayed = new BehaviorSubject(false);
	public text = new BehaviorSubject('');

	public theme = TlNotificationTheme.Warning;

	public show(value: string, theme: TlNotificationTheme) {
		this.text.next(value);
		this.theme = theme;
		this.isDisplayed.next(true);
	}

	public hide() {
		this.text.next('');
		this.isDisplayed.next(false);
	}
}
