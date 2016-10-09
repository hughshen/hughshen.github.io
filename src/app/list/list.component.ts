import { Component, OnInit } from '@angular/core';

import { ListService } from './list.service';

@Component({
	selector: 'list',
	templateUrl: './list.component.html',
	providers: [ ListService ]
})
export class List implements OnInit {

	data: Object[];

	constructor(private listService: ListService) {
		this.listService = listService;
		this.data = [];
	}

	ngOnInit(): void {
		this.listService.getList().subscribe((data: any) => {
			for (let val of data) {
				if (/\.md$/.test(val.name)) {
					this.data.push({
						fullTitle: val.name,
						created: val.name.match(/[\d]{13}/i)[0],
						title: val.name.slice(0, -3).replace(/[\d]{13}-/i, '')
					});
				}
			}
		});
	}
}
