/**
 * Created by vivaldi on 16/08/2014.
 */


describe('ProdCtrl E2E Test', function() {

	beforeEach(function() {
		browser().navigateTo('#/');
	});

	it('Should have a list of products', function() {

		element('.media-list').query(function($el, done) {
			expect($el.children().length>0).toBe(true);
		});

	});


});