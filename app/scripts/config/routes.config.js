/**
 * Created by vivaldi on 16/08/2014.
 */

'use strict';

angular.module('DelDev.Config')
	.config(function ($routeProvider) {
		$routeProvider
			.when('/', {
				templateUrl: 'views/main.html',
				controller: 'MainCtrl'
			})
			.otherwise({
				redirectTo: '/'
			});
	});