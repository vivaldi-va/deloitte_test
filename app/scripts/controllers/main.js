'use strict';

/**
 * @ngdoc function
 * @name deloitteDevTestApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the deloitteDevTestApp
 */
angular.module('deloitteDevTestApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
