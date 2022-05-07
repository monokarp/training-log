import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, timeout } from 'rxjs';

@Injectable()
export class HttpService {
	constructor(private http: HttpClient) {}

	public get(url: string): Observable<unknown> {
		return this.http.get(url).pipe(timeout(1000));
	}

	public post<D>(url: string, data: D): Observable<unknown> {
		return this.http.post(url, { data }).pipe(timeout(1000));
	}
}
