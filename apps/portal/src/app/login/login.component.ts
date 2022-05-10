import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AppRoutes } from '../app.routes.enum';
import { AuthService } from '../auth/auth.service';
import { NavigationService } from '../shared/navigation.service';
import { SessionStore } from './session.store';

@Component({
	selector: 'portal-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
	public username = new FormControl();

	constructor(
		private sessionStore: SessionStore,
		private authService: AuthService,
		private navigation: NavigationService,
	) {}

	public async onUserSelect() {
		const user = this.sessionStore.activeUser$.getValue();

		if (!this.username.value) {
			return;
		}

		const userData = await this.authService.login(this.username.value);

		if (userData) {
			this.sessionStore.activeUser$.next(userData);

			this.navigation.open(AppRoutes.Program);
		}
	}
}
