import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DetailService } from './detail.service';

@Component({
	selector: 'detail',
	templateUrl: './detail.component.html',
	providers: [ DetailService ]
})
export class Detail implements OnInit {

	data: any;

	constructor(private detailService: DetailService, private route: ActivatedRoute) {
		this.detailService = detailService;
		this.route = route;
		this.data = '';
	}

	ngOnInit(): void {
		this.route.params.subscribe(params => {
			if (params['title'].length) {
				this.detailService.getDetail(params['title']).subscribe((data: any) => {
					this.data = data._body;
				});
			}
		});
	}
}
