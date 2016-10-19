import { Component } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';
declare let ga:Function;

import './app.component.less';

@Component({
	selector: 'app',
	templateUrl: './app.component.html'
})
export class AppComponent {
	constructor(private router:Router) {
		this.router.events.subscribe((event: Event) => {
			if (event instanceof NavigationEnd) {
				ga('set', 'page', event.urlAfterRedirects.replace(/[\d]{13}-/i, ''));
				ga('send', 'pageview');
			}
		});
	}
}
