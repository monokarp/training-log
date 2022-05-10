import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { SessionStore } from '../login/session.store';

@Injectable()
export class UserLoggedIn implements CanActivate {
	constructor(private store: SessionStore, private router: Router) {}

	canActivate(): boolean | UrlTree {
		return this.store.activeUser$.getValue() ? true : this.router.parseUrl('/login');
	}
}
