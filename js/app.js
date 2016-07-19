'use strict';

var app = angular.module('mainApp', [
	'ngResource',
	'ngRoute',
	'ngSanitize',
	'ngAnimate',
]);

app.constant('GitConfig', {
	owner: 'hughshen',
	repo: 'hughshen.github.io',
	path: '',
	ref: 'markdown'
});

app.factory('ListService', ['$resource',
	function ($resource) {
		return $resource('https://api.github.com/repos/:owner/:repo/contents/:path', {
			owner: '@owner',
			repo: '@repo',
			path: '@path'
		});
	}]
);

app.factory('DetailService', ['$q', '$http', 'GitConfig',
	function($q, $http, GitConfig) {
		return {
			getHtml: function(title) {
				var d = $q.defer();
				$http({
					method: 'GET',
					url: 'https://api.github.com/repos/' + GitConfig.owner + '/' + GitConfig.repo + '/contents/' + GitConfig.path + '/' + title + '?ref=' + GitConfig.ref,
					headers: {
						'Accept': 'application/vnd.github.v3.html'
					}
				}).then(function(response) {
					d.resolve(response.data);
				}, function err(reason) {
					d.reject(reason);
				});
				return d.promise;
			}
		}
	}]
);

app.service('AnalyticsService', function($location, $window) {
	this.recordPageview = function() {
		$window.ga('create', 'UA-62100459-1', 'auto');
		$window.ga('set', 'page', $location.path());
		$window.ga('send', 'pageview');
	};
});

app.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.when('/', {
			templateUrl: './partials/list.html',
			controller: 'commonController'
		}).when('/detail/:title', {
			templateUrl: './partials/detail.html',
			controller: 'detailController',
			resolve: {
				DetailHtml: ['$route', 'DetailService',
				function($route, DetailService) {
					var title = $route.current.params['title'];
					return DetailService.getHtml(title);
				}]
			}
		}).otherwise('/');
	}]
);

app.controller('commonController', ['$scope', 'GitConfig', 'ListService', 'AnalyticsService',
	function($scope, GitConfig, ListService, AnalyticsService) {

	$scope.wrapShow = false;
	$scope.list = [];

	ListService.query(GitConfig, function(data) {
		angular.forEach(data, function(val, key) {
			var tmp = {};
			tmp.fullTitle = val.name;
			tmp.downloadUrl = val.download_url;
			tmp.created = val.name.match(/[\d]{13}/i)[0];
			tmp.title = val.name.slice(0, -3).replace(/[\d]{13}-/i, '');
			$scope.list.push(tmp);
		});
		$scope.wrapShow = true;
	});

	AnalyticsService.recordPageview();
}]);

app.controller('detailController', ['$scope', '$routeParams', 'AnalyticsService', 'DetailHtml',
	function($scope, $routeParams, AnalyticsService, DetailHtml) {

	$scope.wrapShow = false;
	$scope.currentItem = {};
	$scope.currentItem.title = $routeParams.title.slice(0, -3).replace(/[\d]{13}-/i, '');

	$scope.currentItem.html = DetailHtml;
	$scope.wrapShow = true;

	AnalyticsService.recordPageview();
}]);