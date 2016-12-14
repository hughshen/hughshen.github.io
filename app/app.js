'use strict';

require('./ga');

const angular = require('angular');

angular.module('Blog', [
	require('angular-route'),
	require('./services'),
	require('./list/list'),
	require('./post/post')
])

.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.otherwise('/');
	}
]);
