import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { ROUTER } from './app.router';
import { AppComponent } from './app.component';
import { List } from './list';
import { Detail } from './detail';

@NgModule({
	imports: [
		BrowserModule,
		HttpModule,
		RouterModule.forRoot(ROUTER, { useHash: true })
	],
	declarations: [
		AppComponent,
		List,
		Detail
	],
	bootstrap: [ AppComponent ]
})
export class AppModule { }
