import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AuthService } from './auth.service';

@NgModule({
	imports: [CommonModule, SharedModule],
	providers: [AuthService],
})
export class AuthModule {}
