angular.module( 'app', [
	'testPage',
	'angular-carousel',
	'ui.router'
])

.config( ['$stateProvider', '$urlRouterProvider', function( $stateProvider, $urlRouterProvider ) {
	$stateProvider.state( 'main-page', {
		url: '/',
		views: {
			"main": {
				controller: 'MainPageCtrl',
				templateUrl: 'app/app.html'
			}
		},
		data:{ pageTitle: 'Main Page' }
	});

	$urlRouterProvider.otherwise('/');
}])

.controller( 'AppCtrl', ['$scope', '$rootScope', '$location', function ( $scope, $rootScope, $location ) {
    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
        console.log('arguments: ', arguments);

        $rootScope.pageTitle = toState.data.pageTitle || null;
        $rootScope.containerClass = toState.data.containerClass || null;
    });

}])

.controller( 'MainPageCtrl', ['$scope', '$rootScope', '$location', function ( $scope, $rootScope, $location ) {

}])

.directive("navBar", ['$timeout', function($timeout) {
    return {
        restrict: 'EAC',
        replace: true,
        controller: function($scope, $element, $attrs){

        },

        link: function(scope, element, attrs){
            scope.makeFullscreen = function () {
                $('[ui-view]').addClass('container-fullscreen');
            };
        }
    };
}])

;

