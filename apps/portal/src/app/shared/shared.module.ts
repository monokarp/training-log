import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpService } from './http.service';
import { HttpClientModule } from '@angular/common/http';
import { NavigationService } from './navigation.service';

@NgModule({
	imports: [CommonModule, HttpClientModule],
	providers: [HttpService, NavigationService],
	declarations: [],
})
export class SharedModule {}
