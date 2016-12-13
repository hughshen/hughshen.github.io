require('../css/site.less');
require('../css/list.less');
require('../css/post.less');
require('./ga');

const angular = require('angular');

var Routes = require('./routes');
var Services = require('./services');
var Controllers = require('./controllers');

var app = angular.module('Blog', [
	require('angular-resource'),
	require('angular-route'),
	require('angular-sanitize'),
	require('angular-animate'),
	'Routes',
	'Services',
	'Controllers',
]);
