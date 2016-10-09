import { Routes } from '@angular/router';

import { List } from './list';
import { Detail } from './detail';

export const ROUTER: Routes = [
	{ path: '', component: List },
	{ path: 'detail/:title', component: Detail },
	{ path: '**', component: List }
];