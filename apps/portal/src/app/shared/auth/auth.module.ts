import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CoreModule } from '../core/core.module';
import { UserLoggedIn } from './auth.route-guard';
import { AuthService } from './auth.service';

@NgModule({
	imports: [CommonModule, CoreModule],
	providers: [AuthService, UserLoggedIn],
	declarations: [],
})
export class AuthModule {}
