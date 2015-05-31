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
				controller: 'AppCtrl',
				templateUrl: 'app/app.html'
			}
		},
		data:{ pageTitle: 'Main Page' }
	});

	$urlRouterProvider.otherwise('/');
}])

.controller( 'AppCtrl', ['$scope', '$location', function ( $scope, $location ) {
	$scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
		if ( angular.isDefined( toState.data.pageTitle ) ) {
			$scope.pageTitle = toState.data.pageTitle;
		}
	});


}])

;

