var Controllers = angular.module('Controllers', []);

Controllers.controller('mainController', ['$scope', 'GitConfig', 'ListService', 'AnalyticsService',
	function($scope, GitConfig, ListService, AnalyticsService) {
		$scope.pageClass = 'page-list';
		$scope.loading = true;
		$scope.list = [];

		ListService.query(GitConfig, function(data) {
			angular.forEach(data, function(val, key) {
				$scope.list.push({
					fullTitle: val.name,
					created: val.name.match(/[\d]{13}/i)[0],
					title: val.name.slice(0, -3).replace(/[\d]{13}-/i, '')
				});
			});
			$scope.loading = false;
		});

		AnalyticsService.recordPageview();
	}
]);

Controllers.controller('detailController', ['$scope', '$routeParams', 'AnalyticsService', 'DetailHtml',
	function($scope, $routeParams, AnalyticsService, DetailHtml) {
		$scope.pageClass = 'page-detail';
		$scope.loading = true;
		$scope.currentItem = {};
		$scope.currentItem.created = $routeParams.title.match(/[\d]{13}/i)[0];
		$scope.currentItem.title = $routeParams.title.slice(0, -3).replace(/[\d]{13}-/i, '');

		$scope.currentItem.html = DetailHtml;
		$scope.loading = false;

		AnalyticsService.recordPageview();
	}
]);

module.exports = Controllers;