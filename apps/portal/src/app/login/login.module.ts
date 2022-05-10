import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatComponentsModule } from '../material/mat-components.module';
import { MatFormsModule } from '../material/mat-forms.module';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './login.component';
import { SessionStore } from './session.store';

@NgModule({
	declarations: [LoginComponent],
	imports: [CommonModule, SharedModule, MatComponentsModule, MatFormsModule],
	providers: [SessionStore],
	exports: [LoginComponent],
})
export class LoginModule {}
