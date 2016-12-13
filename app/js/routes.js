var Routes = angular.module('Routes', []);

Routes.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.when('/', {
			template: require('../partials/list.html'),
			controller: 'mainController'
		}).when('/detail/:title', {
			template: require('../partials/detail.html'),
			controller: 'detailController',
			resolve: {
				DetailHtml: ['$route', 'DetailService',
					function($route, DetailService) {
						var title = $route.current.params['title'];
						return DetailService.getHtml(title);
					}
				]
			}
		}).otherwise('/');
	}
]);

Routes.run(['$rootScope', '$routeParams', '$window',
	function($rootScope, $routeParams, $window) {
		$rootScope.$on('$routeChangeSuccess', function(current, prev) {
			var documentTitle = 'Hugh Blog';
			if (!angular.isUndefined($routeParams.title)) {
				documentTitle = $routeParams.title.slice(0, -3).replace(/[\d]{13}-/i, '');
			}
			$window.document.title = documentTitle;
		});
	}
]);

module.exports = Routes;