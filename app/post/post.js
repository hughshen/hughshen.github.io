'use strict';

require('./post.less');

angular.module('Post', [
	require('angular-route'),
	require('angular-sanitize')
])

.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.when('/post/:title', {
			templateUrl: 'app/post/post.html',
			controller: 'PostController',
			controllerAs: 'post',
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

.controller('PostController', ['$routeParams', 'AnalyticsService', 'PostHtml',
	function($routeParams, AnalyticsService, PostHtml) {
		var post = this;
		post.created = $routeParams.title.match(/[\d]{13}/i)[0];
		post.title = $routeParams.title.slice(0, -3).replace(/[\d]{13}-/i, '');
		post.html = PostHtml;
		AnalyticsService.recordPageview();
	}
]);

module.exports =  'Post';
