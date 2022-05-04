import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AdminModule } from './admin/admin.module';
import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { MenuModule } from './menu/menu.module';
import { ProgramModule } from './program/program.module';
import { StatsModule } from './stats/stats.module';

@NgModule({
	declarations: [AppComponent],
	imports: [
		RouterModule.forRoot(routes),
		BrowserModule,
		NoopAnimationsModule,
		MenuModule,
		ProgramModule,
		StatsModule,
		AdminModule,
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
