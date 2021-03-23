import { Injectable } from '@angular/core';
import { CanLoad, UrlTree, Route, UrlSegment, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { getUser } from '../models/user';

@Injectable({
	providedIn: 'root'
})
export class PagesGuard implements CanLoad {

	constructor(
		private router: Router,
	) {
	}

	canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
		// check perms (service) of User and go to new deniedPage if not 
		if (getUser()) {
			return true
		} else {
			this.router.navigateByUrl('/login', { replaceUrl: true })
			return false;
		}
	}
}
