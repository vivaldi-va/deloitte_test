'use strict';


/**
 * @ngdoc overview
 * @name deloitteDevTestApp
 * @description
 * # deloitteDevTestApp
 *
 * Main module of the application.
 */
angular.module('DelDev.Config', ['ngRoute']);
angular.module('DelDev.Controllers', []);
angular.module('DelDev.Services', []);
angular.module('DelDev.Filters', []);
angular.module('DelDev.Directives', []);


angular
	.module('DelDev', [
		'DelDev.Config',
		'DelDev.Controllers',
		'DelDev.Services',
		'DelDev.Filters',
		'DelDev.Directives'
	])
	.run(function($rootScope) {
		$rootScope.cart = [];
	});
