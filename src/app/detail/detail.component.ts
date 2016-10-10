import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title }  from '@angular/platform-browser';

import { DetailService } from './detail.service';
import './detail.component.less';

@Component({
	selector: 'detail',
	templateUrl: './detail.component.html',
	providers: [ DetailService ]
})
export class Detail implements OnInit {

	data: any;
	docTitle: string;

	constructor(private detailService: DetailService, private route: ActivatedRoute, private titleService: Title) {
		this.data = {};
		this.docTitle = 'Hugh Blog';
	}

	ngOnInit(): void {
		this.route.params.subscribe(params => {
			if (params['title'].length) {
				this.detailService.getDetail(params['title']).subscribe((data: any) => {
					this.data.title = params['title'].slice(0, -3).replace(/[\d]{13}-/i, '');
					this.data.created = params['title'].match(/[\d]{13}/i)[0];
					this.data.html = data._body;
					this.titleService.setTitle(this.data.title);
				});
			}
		});
	}
}
