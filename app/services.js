'use strict';

module.exports = angular.module('Services', [])

.service('AnalyticsService', ['$location', '$window',
	function($location, $window) {
		return {
			recordPageview: function() {
				var pagePath = $location.path().replace(/[\d]{13}-/i, '');
				var pageTitle = pagePath.replace('/post/', '').replace('.md', '');
				$window.ga('create', 'UA-62100459-1', 'auto');
				$window.ga('set', 'page', pagePath);
				$window.ga('set', 'title', pageTitle);
				$window.ga('send', 'pageview');
			}
		};
	}
]);
