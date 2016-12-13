var Routes = angular.module('Routes', []);

Routes.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.when('/', {
			controller: 'mainController',
			templateUrl: 'app/pages/list.html',
		}).when('/post/:title', {
			controller: 'postController',
			templateUrl: 'app/pages/post.html',
			resolve: {
				PostHtml: ['$route', 'PostService',
					function($route, PostService) {
						var title = $route.current.params['title'];
						return PostService.getHtml(title);
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