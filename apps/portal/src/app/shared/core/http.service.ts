import { HttpClient, HttpErrorResponse, HttpHeaders, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, firstValueFrom, Observable, throwError, timeout } from 'rxjs';
import { SessionService } from '../../pages/login/session.service';
import { SessionStore } from '../../pages/login/session.store';

@Injectable()
export class HttpService {
	private readonly timeout = 1000;

	private get authToken() {
		return this.sessionStore.authToken$.getValue();
	}

	constructor(private http: HttpClient, private sessionStore: SessionStore, private sessionService: SessionService) {}

	public get<R = unknown>(url: string): Promise<R> {
		return this.request(this.http.get(url, this.options())) as Promise<R>;
	}

	public post<D, R = unknown>(url: string, data: D): Promise<R> {
		return this.request(this.http.post(url, data, this.options())) as Promise<R>;
	}

	public put<D, R>(url: string, data: D): Promise<R> {
		return this.request(this.http.put<R>(url, data, this.options()));
	}

	public delete<D>(url: string, data: D) {
		return this.request(this.http.delete(url, { ...this.options(), body: data }));
	}

	private request<T>(source: Observable<T>): Promise<T> {
		return firstValueFrom(
			source.pipe(
				timeout(this.timeout),
				catchError((err: HttpErrorResponse) => {
					if (err.status === HttpStatusCode.Unauthorized) {
						this.sessionService.logout();
					}

					return throwError(() => err);
				}),
			),
		);
	}

	private options() {
		return { headers: this.headers() };
	}

	private headers(headers: Record<string, string> = {}): HttpHeaders {
		if (this.authToken) {
			headers['Authorization'] = `Bearer ${this.authToken}`;
		}

		return new HttpHeaders(headers);
	}
}
