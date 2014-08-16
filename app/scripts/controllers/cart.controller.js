/**
 * Created by vivaldi on 16/08/2014.
 */


'use strict';
angular.module('DelDev.Controllers')
	.controller('CartCtrl', function($scope, CartService) {

		$scope.removeFromCart = function(id) {
			CartService.remove(id);
		};

	});