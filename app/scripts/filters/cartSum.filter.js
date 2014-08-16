/**
 * Created by vivaldi on 16/08/2014.
 */


angular.module('DelDev.Filters')
	.filter('sum', function() {
		return function(products) {
			var sum = 0;
			angular.forEach(products, function(product) {
				sum += (product.price * product.quant);
			});

			return sum;
		}
	});