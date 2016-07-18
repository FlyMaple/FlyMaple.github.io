// config.js
// config routing & other config setting. 
// ============================================================================
angular.module('TweetThemeApp', ['ui.router'])
.config(function ($stateProvider, $urlRouterProvider) {
	$stateProvider.state('home', {
		url: '/home.html',
		templateUrl: 'view/home.html',
		controller: 'homeController'
	}).state('userWall', {
		url: '/userWall.html',
		templateUrl: 'view/userWall.html',
		controller: 'userWallController'
	}).state('statistics', {
		url: '/statistics.html',
		templateUrl: 'view/statistics.html',
		controller: 'statisticsController'
	});
	$urlRouterProvider.otherwise('/home.html');
});