'use strict';

require('./ga');

const angular = require('angular');
var Services = require('./services');
var List = require('./list/list');
var Post = require('./post/post');

angular.module('Blog', [
	require('angular-route'),
	'Services',
	'List',
	'Post'
])

.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.otherwise('/');
	}
]);
