import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { UserLoggedIn } from './auth.route-guard';
import { AuthService } from './auth.service';

@NgModule({
	imports: [CommonModule, SharedModule],
	providers: [AuthService, UserLoggedIn],
	declarations: [],
})
export class AuthModule {}
