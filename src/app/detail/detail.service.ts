import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DetailService {

	api: string;
	headers: any;
	options: any;

	constructor(private http: Http) {
		this.http = http;
		this.api = 'https://api.github.com/repos/hughshen/hughshen.github.io/contents//{{title}}?ref=markdown';
		this.headers = new Headers({ 'Accept': 'application/vnd.github.v3.html' });
		this.options = new RequestOptions({ headers: this.headers });
	}

	getDetail(title: string): any {
		this.api = this.api.replace('{{title}}', title);
		return this.http.get(this.api, this.options).map((res: any) => {
			return res;
		});
	}
}