import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AppRoutes } from '../../app.routes.enum';
import { AuthService } from '../../shared/auth/auth.service';
import { NavigationService } from '../../shared/core/navigation.service';
import { SessionStore } from './session.store';

@Component({
	selector: 'portal-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
	public username = new FormControl();

	constructor(
		private sessionStore: SessionStore,
		private authService: AuthService,
		private navigation: NavigationService,
	) {}

	public async onUserSelect() {
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
