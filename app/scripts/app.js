'use strict';

/**
 * @ngdoc overview
 * @name deloitteDevTestApp
 * @description
 * # deloitteDevTestApp
 *
 * Main module of the application.
 */
angular
  .module('deloitteDevTestApp', [
    'ngRoute'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
