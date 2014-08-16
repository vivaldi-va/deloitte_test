/**
 * Created by vivaldi on 16/08/2014.
 */

'use strict';
angular.module('DelDev.Services')
	.factory('ProductService', function($http, $q) {

		function _getProductsFromFile() {

			var dfd = $q.defer();

			$http({
				url: "db/mock.db.json",
				method: 'GET'
			})
				.success(function(data, status) {
					dfd.resolve(data);
				})
				.error(function(reason, status) {
					dfd.reject(reason);
				});

			return dfd.promise;
		}

		return {
			get: _getProductsFromFile
		};


	});