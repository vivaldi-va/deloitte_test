/**
 * Created by vivaldi on 16/08/2014.
 */

'use strict';
angular.module('DelDev.Services')
	.factory('VoucherService', function($rootScope, $http, $q, $filter, $log) {
		function _getVouchers() {

			var dfd = $q.defer();

			$http.get('db/mock.db.json')
				.success(function(data, status) {

					$log.debug("Got vouchers");
					dfd.resolve(data.vouchers);
				})
				.error(function(reason, status) {
					dfd.reject(reason);
				});

			return dfd.promise;
		}


		/**
		 * Apply the voucher to the shopping cart, assuming
		 * it's a valid voucher and the user hasnt used it already.
		 *
		 * @param code
		 * @returns {*}
		 * @private
		 */
		function _applyVoucher(code) {

			$log.debug('applying voucher %s', code);

			var dfd = $q.defer();

			// get the vouchers from the 'db'
			_getVouchers()
				.then(
					function(vouchers) {

						var validVoucher = false;

						$log.debug(vouchers);

						// check if the voucher is in fact valid and exists
						angular.forEach(vouchers, function(voucher, key) {
							if(code===voucher) {

								$log.debug("Voucher is valid");
								validVoucher = voucher;
							}
						});




						if(!!validVoucher) {

							var hasVoucher = false;

							// Check if the voucher isnt added already
							angular.forEach($rootScope.cart, function(item, key) {
								if(item._id===validVoucher) {

									$log.debug("Have that voucher applied already.");

									hasVoucher = true;
								}
							});

							if(!hasVoucher) {

								switch(validVoucher) {
									case '5_QUID_OFF':


										$log.debug("Applying %s", validVoucher);
										$rootScope.cart.push({
											id: validVoucher,
											name: "$5 off total",
											price: -5.0,
											quant: 1
										});

										dfd.resolve();

										break;

									case '10_QUID_OFF':

										var sum = $filter('sum')($rootScope.cart);

										if(sum>50) {
											$rootScope.cart.push({
												_id: validVoucher,
												name: "$10 off total",
												price: -10.0,
												quant: 1
											});
											dfd.resolve();
										} else {
											dfd.reject('ERR_BAD_CONDITIONS')
										}


										break;
									case '15_QUID_OFF':

										var sum = $filter('sum')($rootScope.cart);
										var hasFootware = false;

										angular.forEach($rootScope.cart, function(product, key) {
											if(product.category === 0 || product.category === 1) {
												hasFootware = true;
											}
										});


										if(sum>75 && !!hasFootware) {
											$rootScope.cart.push({
												_id: validVoucher,
												name: "$15 off total",
												price: -15.0,
												quant: 1
											});
										} else {
											dfd.reject('ERR_BAD_CONDITIONS')
										}


										break;
								}
							} else {
								// already has that voucher, shoot out an error
								dfd.reject('ERR_HAS_VOUCHER');
							}

						} else {
							// Voucher isnt valid, spit out errors
							dfd.reject('ERR_NO_VOUCHER');
						}

					}
				);

			return dfd.promise;
		}


		return {
			use: _applyVoucher
		}


	});