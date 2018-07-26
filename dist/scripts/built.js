(function ($, Handlebars, TweenMax) {

	var shopData = {};	// will contain the shop items' data.
	var cartData = {};	// will contain the cart items' data.
	var totalCartItems = 0;
	var totalPriceNum = 0;
	var totalPriceElem = $('#total-price');

	var shopTemplateHTML = document.getElementById('shop-template').innerHTML;
	var shopTemplate = Handlebars.compile(shopTemplateHTML);

	var cartTemplateHTML = document.getElementById('cart-template').innerHTML;
	var cartTemplate = Handlebars.compile(cartTemplateHTML);

	var shopList = $('#shop-list');
	var cart = $('#cart');
	var cartList = $('#cart-list');
	var overlay = $('#modal-overlay');
	var cartNumElm = $('#cart-num');


	// Retrieve cart element's from local storage (if any) and produce the HTML
	if (localStorage.getItem('cartData')) {

		cartData = JSON.parse(localStorage.getItem('cartData'));

		// Get total items in the cart & update cartNum Element.
		for(var i = 0, len = cartData.items.length; i < len; i++) {
			totalCartItems += cartData.items[i].qty;
			cartNumElm.text(totalCartItems);
		}

		totalPriceNum = calculateTotalPrice();
		totalPriceElem.text(totalPriceNum.toFixed(2));
		var cartHTML = cartTemplate(cartData);
		document.getElementById('cart-list').innerHTML = cartHTML;

	}
	else {
		cartData = {
			items: []
		}
	}

	// Read the shop listing item's data and produce the HTML
	$.getJSON("shopdata.json", function(data) {

		shopData = data;
		var shopHTML = shopTemplate(shopData);
		document.getElementById('shop-list').innerHTML += shopHTML;


		var cartIcon = $('#cart-icon');

		shopList.on('click', '.shop-item__add-btn', function(e) {

			if (!TweenMax.isTweening(cartIcon)) {
				TweenMax.from(cartIcon, .7, {scale: 1.5, ease: Bounce.easeOut });
			}

			var shopItem = $(e.target).closest('.shop-item');
			var shopItemId = shopItem.attr('id');
			var idNum = parseInt(shopItemId.replace(/[^0-9]/gi, ''));


			// Check if item exists in cart. If not, create it and run template.
			// Else just increase qty.

			var itemInCart = false;
			for (var i = 0, len = cartData.items.length; i < len; i++) {

				if (cartData.items[i].id == idNum) {
					cartData.items[i].qty++;
					itemInCart = true;
					console.log(cartData);
				}
			}

			if(!itemInCart) {

				var shopItemData;
				for (var i = 0, len = shopData.items.length; i < len; i++) {
					if (shopData.items[i].id == idNum) {
						shopItemData = shopData.items[i];
					}
				}

				shopItemData.qty = 1;
				cartData.items.push(shopItemData);	
			}

			// Set total price & Produce cart's HTML
			totalPriceNum = calculateTotalPrice();
			totalPriceElem.text(totalPriceNum.toFixed(2));
			var cartHTML = cartTemplate(cartData);
			document.getElementById('cart-list').innerHTML = cartHTML;

			totalCartItems++;
			cartNumElm.text(totalCartItems);

			localStorage.setItem('cartData', JSON.stringify(cartData));
		});
	});


	// Open/Close Cart view.
	$('body').on('click', '.cart-toggle', toggleCart);


	shopList.on('click', '.shop-item__details', function(e) {
		console.log('details');
	});


	// --------- Functions --------- //

	function toggleCart(e) {

		var cartDuration = .7;
		var overlayDuration = .5;

		if (cart.hasClass('visible')) {
			if (!TweenMax.isTweening(cart)) {
				TweenMax.to(cart, cartDuration, {right: '-650px', ease: Back.easeIn.config(1.2)});
				cart.removeClass('visible');
				overlay.removeClass('cart-toggle');

				TweenMax.to(overlay, overlayDuration, {display: 'none', opacity: 0});
				$('body').removeClass('no-scroll');
			}
			
		}
		else {
			if (!TweenMax.isTweening(cart)) {
				TweenMax.to(cart, cartDuration, {right: '-50px', ease: Back.easeOut.config(1.2)});
				cart.addClass('visible');
				overlay.addClass('cart-toggle');

				TweenMax.to(overlay, overlayDuration, {display: 'block', opacity: .8});
				$('body').addClass('no-scroll');
			}
		}
	}


	// Return total price of items in the cart.
	function calculateTotalPrice() {
		price = 0;
		for (var i = 0, len = cartData.items.length; i < len; i++) {
			var cartItem = cartData.items[i];
			price += cartItem.price * cartItem.qty;
		}
		console.log(price);
		return price;
	}

	
})(jQuery, Handlebars, TweenMax);