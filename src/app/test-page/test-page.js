angular.module( 'testPage', [
	'ui.router'
])

.config(['$stateProvider', function ( $stateProvider ) {
	$stateProvider.state( 'test-page', {
		url: '/test-page',
		views: {
			"main": {
				controller: 'TestPageCtrl',
				templateUrl: 'app/test-page/test-page.html'
			}
		},
		data:{ pageTitle: 'Test Page' }
	});
}])

.controller( 'TestPageCtrl', ['$scope', function ( $scope ) {

}])

;

