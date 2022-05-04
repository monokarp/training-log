import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, timeout } from 'rxjs';

@Injectable()
export class HttpService {
	constructor(private http: HttpClient) {}

	public get(url: string): Observable<unknown> {
		return this.http.get(url).pipe(timeout(1000));
	}
}
