import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Test } from '@contracts';

@Component({
	selector: 'training-log-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent {
	hello$ = this.http.get<Test>('/api/test');

	constructor(private http: HttpClient) {}
}
