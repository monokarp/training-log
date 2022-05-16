import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CoreModule } from '../../shared/core/core.module';
import { MatComponentsModule } from '../../ui-components/material/mat-components.module';
import { MatFormsModule } from '../../ui-components/material/mat-forms.module';
import { LoginComponent } from './login.component';
import { SessionStore } from './session.store';

@NgModule({
	declarations: [LoginComponent],
	imports: [CommonModule, CoreModule, MatComponentsModule, MatFormsModule],
	providers: [SessionStore],
	exports: [LoginComponent],
})
export class LoginModule {}
