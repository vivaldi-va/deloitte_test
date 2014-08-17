'use strict';

describe('Controller: ProductCtrl', function () {

	// load the controller's module
	beforeEach(angular.mock.module('DelDev'));

	var ProdCtrl,
		scope;

	// Initialize the controller and a mock scope
	beforeEach(inject(function ($controller, $rootScope, ProductService) {
		scope = $rootScope.$new();
		ProdCtrl = $controller('ProdCtrl', {
			$scope: scope
		});

		scope.products = ['hue']
	}));

	it('should have a single product', function() {
		expect(scope.products.length).toBe(1);
	});


});
