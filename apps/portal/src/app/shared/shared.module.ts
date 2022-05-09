import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpService } from './http.service';
import { HttpClientModule } from '@angular/common/http';
import { NavigationService } from './navigation.service';
import { SessionStore } from './session.store';

@NgModule({
	imports: [CommonModule, HttpClientModule],
	providers: [HttpService, NavigationService, SessionStore],
})
export class SharedModule {}
