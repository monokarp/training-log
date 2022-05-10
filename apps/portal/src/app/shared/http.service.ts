import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable, timeout } from 'rxjs';

@Injectable()
export class HttpService {
	constructor(private http: HttpClient) {}

	public get(url: string): Promise<unknown> {
		return this.request(this.http.get(url));
	}

	public post<D>(url: string, data: D): Promise<unknown> {
		return this.request(this.http.post(url, { data }));
	}

	public put<D, R>(url: string, data: D): Promise<R> {
		return this.request(this.http.put<R>(url, { data }));
	}

	public delete<D>(url: string, data: D) {
		return this.request(this.http.delete(url, { body: data }));
	}

	private request<T>(source: Observable<T>): Promise<T> {
		return firstValueFrom(source.pipe(timeout(1000)));
	}
}
