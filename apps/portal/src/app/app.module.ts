import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { MenuModule } from './menu/menu.module';

@NgModule({
	declarations: [AppComponent],
	imports: [RouterModule.forRoot(routes), BrowserModule, NoopAnimationsModule, MenuModule],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
