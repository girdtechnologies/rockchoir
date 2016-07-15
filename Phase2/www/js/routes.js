/**
 * Ionic Routes For Complete Application
 * Route with :id are dynamic with sepcific city or venue
 */
app.config( function ( $stateProvider, $urlRouterProvider, $httpProvider, $ionicConfigProvider )
{
	//$ionicConfigProvider.scrolling.jsScrolling( false );
	$stateProvider
		.state( 'app', {
			url: '/login',
			templateUrl: 'login.html',
		} )
		.state( 'home', {
			url: '/home',
			templateUrl: 'templates/home.html',
			controller: 'appCtrl'
		} )
		.state( 'songlist1', {
			url: '/songlist1',
			templateUrl: 'templates/songlist1.html',
			controller: 'appCtrl'
		} )
		.state( 'BillingHistory1', {
			url: '/BillingHistory1',
			templateUrl: 'templates/BillingHistory1.html',
			controller: 'appCtrl'
		} )
		.state( 'BillingHistory', {
			url: '/BillingHistory',
			templateUrl: 'templates/BillingHistory.html',
			controller: 'appCtrl'
		} )
		.state( 'PersonalInfo', {
			url: '/PersonalInfo',
			templateUrl: 'templates/personal_info_menu.html',
			controller: 'appCtrl'
		} )
		.state( 'SessionCalender1', {
			url: '/SessionCalender1',
			templateUrl: 'templates/SessionCalender1.html',
			controller: 'appCtrl'
		} )
		.state( 'SessionCalender', {
			url: '/SessionCalender',
			templateUrl: 'templates/SessionCalender.html',
			controller: 'appCtrl'
		} )
		
	 	.state( 'SongList', {
			url: '/SongList',
			templateUrl: 'templates/SongList.html',
			controller: 'appCtrl'
		} )
		/* .state( 'BillingHistory', {
			url: '/BillingHistory',
			templateUrl: 'templates/BillingHistory.html',
			controller: 'appCtrl'
		} ) */
		
		.state( 'MedicalInfo', {
			url: '/MedicalInfo',
			templateUrl: 'templates/MedicalInfo.html',
			controller: 'appCtrl'
		} )
		.state( 'EmergencyContact', {
			url: '/EmergencyContact',
			templateUrl: 'templates/EmergencyContact.html',
			controller: 'appCtrl'
		} )
		.state( 'PersonalInfoPage', {
			url: '/PersonalInfoPage',
			templateUrl: 'templates/PersonalInfo.html',
			controller: 'appCtrl'
		} );


	$urlRouterProvider.otherwise( '/login' );
} );

app.config(['$httpProvider', function($httpProvider) {
	$httpProvider.defaults.useXDomain = true;
	delete $httpProvider.defaults.headers.common['X-Requested-With'];
}
]);
