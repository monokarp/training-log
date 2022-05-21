import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { LoginModule } from './pages/login/login.module';
import { MenuModule } from './pages/menu/menu.module';

@NgModule({
	declarations: [AppComponent],
	imports: [BrowserModule, NoopAnimationsModule, MenuModule, AppRoutingModule, LoginModule],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
