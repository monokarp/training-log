import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
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
	public username = new FormControl('', [Validators.required]);
	public password = new FormControl('', [Validators.required]);

	constructor(
		private sessionStore: SessionStore,
		private authService: AuthService,
		private navigation: NavigationService,
	) {}

	public async onUserSelect() {
		if (this.username.invalid || this.password.invalid) {
			return;
		}

		// TODO move to auth svc?
		const userData = await this.authService.login(this.username.value, this.password.value);

		if (userData) {
			this.sessionStore.activeUser$.next(userData.user);
			this.sessionStore.authToken$.next(userData.token);

			this.navigation.open(AppRoutes.Program);
		}
	}
}
