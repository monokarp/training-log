import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { SessionStore } from '../../pages/login/session.store';

@Injectable()
export class UserLoggedIn implements CanActivate {
	constructor(private store: SessionStore, private router: Router) {}

	canActivate(): boolean | UrlTree {
		return this.store.currentlyManagedUser$.getValue() ? true : this.router.parseUrl('/login');
	}
}
