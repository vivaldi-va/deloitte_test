/**
 * Created by vivaldi on 16/08/2014.
 */


angular.module('DelDev.Filters')
	.filter('sum', function() {
		return function(products) {
			var sum = 0;
			angular.forEach(products, function(product) {
				var calcedPrice = product.price;
				if(!!product.quant) {
					calcedPrice *= product.quant;
				}

				sum += calcedPrice;
			});

			return sum;
		}
	});