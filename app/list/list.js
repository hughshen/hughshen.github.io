'use strict';

require('./list.less');

angular.module('List', [
	require('angular-route')
])

.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.when('/', {
			templateUrl: 'app/list/list.html',
			controller: 'ListController',
			controllerAs: 'list'
		});
	}
])

.controller('ListController', ['$http', 'AnalyticsService',
	function($http, AnalyticsService) {
		var list = this;
		list.posts = [];
		$http.get('https://hughshen.github.io/blog/data.json').then(function(res) {
			angular.forEach(res.data, function(title, key) {
				list.posts.push({
					full: title,
					title: title.slice(0, -3).replace(/[\d]{13}-/i, ''),
					created: title.match(/[\d]{13}/i)[0]
				});
			});
		});
		AnalyticsService.recordPageview();
	}
]);

module.exports =  'List';
