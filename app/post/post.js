'use strict';

require('./post.less');

module.exports =  angular.module('Post', [
	require('angular-route'),
	require('angular-sanitize')
])

.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.when('/post/:title', {
			controller: 'PostController',
			templateUrl: 'app/post/post.html',
			resolve: {
				PostHtml: ['$route', 'PostService',
					function($route, PostService) {
						var title = $route.current.params['title'];
						return PostService.getHtml(title);
					}
				]
			}
		});
	}
])

.service('PostService', ['$q', '$http',
	function($q, $http) {
		return {
			getHtml: function(title) {
				var d = $q.defer();
				$http({
					method: 'GET',
					url: 'https://api.github.com/repos/hughshen/blog/contents/posts/' + title,
					headers: {
						'Accept': 'application/vnd.github.v3.html'
					}
				}).then(function(response) {
					d.resolve(response.data);
				}, function(reason) {
					d.reject(reason);
				});
				return d.promise;
			}
		};
	}
])

.controller('PostController', ['$scope', '$routeParams', 'AnalyticsService', 'PostHtml',
	function($scope, $routeParams, AnalyticsService, PostHtml) {
		$scope.post = {};
		$scope.post.created = $routeParams.title.match(/[\d]{13}/i)[0];
		$scope.post.title = $routeParams.title.slice(0, -3).replace(/[\d]{13}-/i, '');
		$scope.post.html = PostHtml;

		AnalyticsService.recordPageview();
	}
]);