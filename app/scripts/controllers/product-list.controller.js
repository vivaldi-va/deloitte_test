/**
 * Created by vivaldi on 16/08/2014.
 */

'use strict';

angular.module('DelDev.Controllers')
	.controller('ProdCtrl', function($scope, $rootScope, $log, ProductService, CartService) {

		$scope.errors		= [];
		$scope.successes	= [];

		ProductService.get()
			.then(function(data) {
				$rootScope.products = data.products;
			});

		$scope.addProduct = function(product) {
			$log.debug("Add product to cart");
			CartService.add(product)
				.then(function(success) {

				},
				function(err) {
					$scope.errors.push(err);
				});
		};

	});