var Services = angular.module('Services', []);

Services.service('AnalyticsService', ['$location', '$window',
	function($location, $window) {
		return {
			recordPageview: function() {
				$window.ga('create', 'UA-62100459-1', 'auto');
				$window.ga('set', 'page', $location.path().replace(/[\d]{13}-/i, ''));
				$window.ga('send', 'pageview');
			}
		};
	}
]);

Services.service('PostService', ['$q', '$http',
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
]);

module.exports = Services;