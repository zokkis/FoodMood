import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'my-menu',
	templateUrl: './menu.component.html',
	styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {

	constructor(
		private router: Router,
	) {
	}

	logout(): void {
		this.router.navigate(['login'], { replaceUrl: true });
	}
}
