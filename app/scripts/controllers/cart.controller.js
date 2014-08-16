/**
 * Created by vivaldi on 16/08/2014.
 */


'use strict';
angular.module('DelDev.Controllers')
	.controller('CartCtrl', function($scope, $filter, CartService, VoucherService) {

		$scope.voucherError = null;

		$scope.removeFromCart = function(id) {
			CartService.remove(id);
		};

		$scope.voucher = function() {
			// reset errors when submitting again
			$scope.voucherError = null;

			if(!!$scope.voucherCode) {
				VoucherService.use($scope.voucherCode)
					.then(function(success) {

					},
					function(err) {
						switch(err) {
							case 'ERR_BAD_CONDITIONS':

								switch($scope.voucherCode) {
									case '10_QUID_OFF':

										$scope.voucherError = "Must spend " + $filter('currency')(50) + " to use this voucher";

										break;
									case '15_QUID_OFF':

										$scope.voucherError = "Must spend " + $filter('currency')(75) + " and buy one foot-ware product to use this voucher";

										break;
								}

								break;

							case 'ERR_HAS_VOUCHER':
								$scope.voucherError = "You can only use that voucher once";
								break;

							case 'ERR_NO_VOUCHER':
								$scope.voucherError = "Voucher code doesn't seem to be valid, check it again";
								break;


						}
					});
			} else {
				$scope.voucherError = "Enter a voucher code first";
			}
		};

	});