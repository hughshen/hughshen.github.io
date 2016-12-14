'use strict';

require('./list.less');

module.exports =  angular.module('List', [
	require('angular-route')
])

.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.when('/', {
			templateUrl: 'app/list/list.html',
			controller: 'ListController'
		});
	}
])

.controller('ListController', ['$scope', '$http', 'AnalyticsService',
	function($scope, $http, AnalyticsService) {
		$scope.list = [];

		$http.get('https://hughshen.github.io/blog/data.json').then(function(res) {
			angular.forEach(res.data, function(title, key) {
				$scope.list.push({
					full: title,
					title: title.slice(0, -3).replace(/[\d]{13}-/i, ''),
					created: title.match(/[\d]{13}/i)[0]
				});
			});
		});

		AnalyticsService.recordPageview();
	}
]);
