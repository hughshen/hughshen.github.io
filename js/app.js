
var app = angular.module('mainApp', ['ngResource', 'ngRoute', 'ngSanitize']);

app.constant('GitConfig', {
	owner: 'hughshen',
	repo: 'hughshen.github.io',
	path: '',
	ref: 'markdown'
});

app.factory('ListResource', function ($resource) {
	return $resource('https://api.github.com/repos/:owner/:repo/contents/:path', {
		owner: '@owner',
		repo: '@repo',
		path: '@path'
	});
});

app.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/', {
		templateUrl: './partials/list.html',
		controller: 'commonController'
	}).when('/detail/:title', {
		templateUrl: './partials/detail.html',
		controller: 'detailController'
	}).otherwise('/');
}]);

app.controller('commonController', ['$scope', 'GitConfig', 'ListResource', function($scope, GitConfig, ListResource) {

	$scope.wrapShow = false;
	$scope.list = [];

	ListResource.query(GitConfig, function(data) {
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
}]);

app.controller('detailController', ['$scope', '$http', '$routeParams', 'GitConfig', function($scope, $http, $routeParams, GitConfig) {

	$scope.wrapShow = false;
	$scope.currentItem = {};
	$scope.currentItem.title = $routeParams.title.slice(0, -3).replace(/[\d]{13}-/i, '');

	$http({
		method: 'GET',
		url: 'http://api.github.com/repos/' + GitConfig.owner + '/' + GitConfig.repo + '/contents/' + GitConfig.path + '/' + $routeParams.title + '?ref=' + GitConfig.ref,
		headers: {
			'Accept': 'application/vnd.github.v3.html'
		}
	}).then(function(res) {
		$scope.currentItem.html = res.data;
		$scope.wrapShow = true;
	});
}]);