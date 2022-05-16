import { Injectable } from '@angular/core';
import { TlNotificationComponent } from './tl-notification/tl-notification.component';

export enum TlNotificationTheme {
	Warning = 'warning',
	Info = 'info',
}

@Injectable()
export class TlNotification {
	private componentRef: TlNotificationComponent | undefined;

	public setRef(ref: TlNotificationComponent) {
		this.componentRef = ref;
	}

	public clearRef() {
		this.componentRef = undefined;
	}

	public warn(value: string) {
		this.show(value, TlNotificationTheme.Warning);
	}

	public info(value: string) {
		this.show(value, TlNotificationTheme.Info);
	}

	private show(value: string, theme: TlNotificationTheme) {
		this.componentRef?.show(value, theme);
	}

	public hide() {
		this.componentRef?.hide();
	}
}
