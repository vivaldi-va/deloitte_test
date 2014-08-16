/**
 * Created by vivaldi on 16/08/2014.
 */

'use strict';
angular.module('DelDev.Services')
	.factory('CartService', function($rootScope, $log, $q) {




		function _addProductToCart(product) {
			$log.debug("Push into cart array");



			var dfd 			= $q.defer();
			var productInCart	= false;
			var productInStock	= true;

			var inCartProduct = {
				_id: product._id,
				name: product.name,
				quant: 1,
				price: !!product.discount ? product.discount : product.price
			};


			angular.forEach($rootScope.products, function(val, key) {
				if(val._id === product._id) {

					if(product.quant>0) {
						$rootScope.products[key].quant --;
					} else {
						productInStock = false;
						//dfd.reject("ERR_NO_STOCK");
					}

				}
			});

			if(productInStock) {

				angular.forEach($rootScope.cart, function(val, key) {
					if(val._id === product._id) {

						productInCart = true;
						$rootScope.cart[key].quant++
					}
				});


				if(!productInCart) {
					$rootScope.cart.push(inCartProduct);
				}

				dfd.resolve()
			} else {
				dfd.reject('ERR_NO_STOCK');
			}


			return dfd.promise;
		}

		function _removeFromCart(id) {
			$log.debug("Remove %d from cart array", id);

			var inCart = true;

			angular.forEach($rootScope.products, function(product, key) {
				if(product._id === id) {

					if(inCart) {
						$rootScope.products[key].quant++;
					}

				}
			});

			angular.forEach($rootScope.cart, function(product, key) {
				if(product._id === id) {
					if(product.quant > 1) {
						$rootScope.cart[key].quant--;
					} else {
						$rootScope.cart.splice(key, 1);
						inCart = false;
					}

				}
			});





		}

		return {
			add: _addProductToCart,
			remove: _removeFromCart
		};

	});