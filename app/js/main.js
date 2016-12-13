require('../css/site.less');
require('./ga.js');

var Routes = require('./routes.js');
var Services = require('./services.js');
var Controllers = require('./controllers.js');

'use strict';

var app = angular.module('mainApp', [
	'ngResource',
	'ngRoute',
	'ngSanitize',
	'ngAnimate',
	'Routes',
	'Services',
	'Controllers',
]);

app.constant('GitConfig', {
	owner: 'hughshen',
	repo: 'hughshen.github.io',
	path: '',
	ref: 'markdown'
});
