import { Component, OnInit } from '@angular/core';
import { Title }  from '@angular/platform-browser';

import { ListService } from './list.service';
import './list.component.less';

@Component({
	selector: 'list',
	templateUrl: './list.component.html',
	providers: [ ListService ]
})
export class List implements OnInit {

	data: Object[];
	docTitle: string;

	constructor(private listService: ListService, private titleService: Title) {
		this.data = [];
		this.docTitle = 'Hugh Blog';
	}

	ngOnInit(): void {
		this.listService.getList().subscribe((data: any) => {
			data.reverse();
			for (let val of data) {
				if (/\.md$/.test(val.name)) {
					this.data.push({
						fullTitle: val.name,
						created: val.name.match(/[\d]{13}/i)[0],
						title: val.name.slice(0, -3).replace(/[\d]{13}-/i, '')
					});
				}
			}
			this.titleService.setTitle(this.docTitle);
		});
	}
}
