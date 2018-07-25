(function ($, Handlebars, TweenMax) {

	var shopData = null;	// will contain the shop items' data.
	var cartData = null;	// will contain the cart items' data.

	var shopTemplateHTML = document.getElementById('shop-template').innerHTML;
	var shopTemplate = Handlebars.compile(shopTemplateHTML);

	var cartTemplateHTML = document.getElementById('cart-template').innerHTML;
	var cartTemplate = Handlebars.compile(cartTemplateHTML);

	$.getJSON("shopdata.json", function(data) {

		shopData = data;
		console.log(shopData);
		var shopHTML = shopTemplate(data);
		document.getElementById('shop-list').innerHTML += shopHTML;

		
	});

	var shopList = $('#shop-list');
	var cart = $('#cart');
	var cartList = $('#cart-list');
	var overlay = $('#modal-overlay');

	$('body').on('click', '.cart-toggle', function() {

		var duration = .7;
		if (cart.hasClass('visible')) {
			TweenMax.to('#cart', duration, {left: '100%'});
			cart.removeClass('visible');
			overlay.removeClass('cart-toggle');

			TweenMax.to(overlay, duration, {display: 'none', opacity: 0});
			$('body').removeClass('no-scroll');
			
		}
		else {
			TweenMax.to('#cart', duration, {left: '50%'});
			cart.addClass('visible');
			overlay.addClass('cart-toggle');

			TweenMax.to(overlay, duration, {display: 'block', opacity: .8});
			$('body').addClass('no-scroll');
			// disable scroll in body
		}
		
	});

	shopList.on('click', '.shop-item__add-btn', function() {
		console.log('buy!');
	});

	shopList.on('click', '.shop-item__details', function() {
		console.log('details');
	});

	console.log(shopList);

	
})(jQuery, Handlebars, TweenMax);