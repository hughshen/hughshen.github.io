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

Services.service('ListService', ['$resource',
	function($resource) {
		return $resource('https://api.github.com/repos/:owner/:repo/contents/:path', {
			owner: '@owner',
			repo: '@repo',
			path: '@path'
		});
	}
]);

Services.service('DetailService', ['$q', '$http', 'GitConfig',
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
				}, function(reason) {
					d.reject(reason);
				});
				return d.promise;
			}
		};
	}
]);

module.exports = Services;