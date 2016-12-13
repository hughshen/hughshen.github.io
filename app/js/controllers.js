var Controllers = angular.module('Controllers', []);

Controllers.controller('mainController', ['$scope', '$http', 'AnalyticsService',
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

Controllers.controller('postController', ['$scope', '$routeParams', 'AnalyticsService', 'PostHtml',
	function($scope, $routeParams, AnalyticsService, PostHtml) {
		$scope.post = {};
		$scope.post.created = $routeParams.title.match(/[\d]{13}/i)[0];
		$scope.post.title = $routeParams.title.slice(0, -3).replace(/[\d]{13}-/i, '');
		$scope.post.html = PostHtml;

		AnalyticsService.recordPageview();
	}
]);

module.exports = Controllers;