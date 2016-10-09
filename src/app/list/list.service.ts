import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ListService {

	api: string;

	constructor(private http: Http) {
		this.http = http;
		this.api = 'https://api.github.com/repos/hughshen/hughshen.github.io/contents/?ref=markdown';
	}

	getList(): any {
		return this.http.get(this.api).map((res: any) => {
			return res.json();
		});
	}
}