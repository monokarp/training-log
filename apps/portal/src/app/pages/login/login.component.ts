import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AppRoutes } from '../../app.routes.enum';
import { AuthService } from '../../shared/auth/auth.service';
import { NavigationService } from '../../shared/core/navigation.service';
import { TestedComponent } from '../../ui-components/common-ui/e2e/tested-component';

@Component({
	selector: 'portal-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent extends TestedComponent {
	public username = new FormControl('', [Validators.required]);
	public password = new FormControl('', [Validators.required]);

	constructor(private authService: AuthService, private navigation: NavigationService) {
		super();
	}

	public async onUserSelect() {
		if (this.username.invalid || this.password.invalid) {
			return;
		}

		if (await this.authService.login(this.username.value!, this.password.value!)) {
			this.navigation.open(AppRoutes.Program);
		}
	}
}
