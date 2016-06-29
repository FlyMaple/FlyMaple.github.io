// config.js
// config routing & other config setting. 
// ============================================================================
angular.module('MarryApp', ['ui.router'])
.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('index', {
			url: '/index.html',
			templateUrl: 'index.html',
			controller: 'indexController'
        });
    $urlRouterProvider.otherwise('/index.html');
});