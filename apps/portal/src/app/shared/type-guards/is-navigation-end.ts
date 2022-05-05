import { NavigationEnd } from '@angular/router';

export function isNavigationEnd(arg: unknown): arg is NavigationEnd {
	return arg instanceof NavigationEnd;
}
