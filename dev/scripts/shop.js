(function ($, Handlebars, TweenMax) {

	var shopData = {};	// will contain the shop items' data.
	var cartData = {};	// will contain the cart items' data.
	var totalCartItems = 0;
	var totalPriceNum = 0;

	
	// ------- Handlebars Templates & Helpers ------- //

	var shopTemplateHTML = $('#shop-template').html();
	var shopTemplate = Handlebars.compile(shopTemplateHTML);

	var cartTemplateHTML = $('#cart-template').html();
	var cartTemplate = Handlebars.compile(cartTemplateHTML);

	var detailsTemplateHTML = $('#item-details-template').html();
	var detailsTemplate = Handlebars.compile(detailsTemplateHTML);


	// ------- jQuery Elements ------- //

	var $body = $('body');
	var $totalPriceElem = $('#total-price');
	var $shop = $('#shop');
	var $shopList = $('#shop-list');
	var $cart = $('#cart');
	var $cartList = $('#cart-list');
	var $cartOverlay = $('#cart-overlay');
	var $cartNumElm = $('#cart-num');
	var $cartIcon = $('#cart-icon');
	var $loadingModal = $('#loading-modal');
	var $loader = $('#loader');
	var $detailsModal = $('#item-details-modal');
	var $detailsOverlay = $('#details-overlay');


    /*
	* Retrieve cart element's from local storage (if any) and update the cart listing.
	*/
	if (localStorage.getItem('cartData')) {

		cartData = JSON.parse(localStorage.getItem('cartData'));
		updateCartList();

	}
	else {
		cartData = {
			items: []
		}
	}

	/*
	* Read the shop listing item's data and produce the HTML
	*/
	$.getJSON("shopdata.json", function(data) {

		shopData = data;
		let shopHTML = shopTemplate(shopData);
		$shopList.html(shopHTML);

		// Just for the thrills.
		setInterval(function() {
			$loader.addClass('success');
			$shop.removeClass('hidden');

			let loaderAnimation = new TimelineMax();

			loaderAnimation
			.to($loader, .4, { 
				border: '0px', 
				backgroundColor: 'black', 
				animation: 'none', 
				rotate: 0})
			.to($loader, .7, {
				height: '0px', 
				width: '0px', 
				display: 'none', 
				top: '50%', 
				left: '50%', 
				ease: Back.easeIn.config(5) })
			.to($loadingModal, .3, {
				opacity: 0, 
				display: 'none',
			})
			.to($shop, .3, {display: 'block', autoAlpha: 1});
		}, 800);

		
		// ------- Event Handlers ------- //

		// Open/Close Cart view.
		$body.on('click', '.cart-toggle', toggleCart);

		$shopList.on('click', '.shop-item__add-btn', function(e) {

			if (!TweenMax.isTweening($cartIcon)) {
				TweenMax.from($cartIcon, .7, {scale: 1.5, ease: Bounce.easeOut });
			}

			var shopItem = $(e.target).closest('.shop-item');
			var shopItemId = shopItem.attr('id');
			var idNum = parseInt(shopItemId.replace(/[^0-9]/gi, ''));


			// Check if item exists in cart. If not, create it.
			// Else just increase item's qty.
			// Finally, update cart list.

			var itemInCart = false;

			for (let item of cartData.items) {
				if (item.id == idNum) {
					item.qty++;
					itemInCart = true;
					break;
				}
			}

			if(!itemInCart) {

				for (let item of shopData.items) {
					if (item.id == idNum) {
						item.qty = 1;
						cartData.items.unshift(item);
						break;
					}
				}	
			}

			updateCartList();
			localStorage.setItem('cartData', JSON.stringify(cartData));
		});

		$body.on('click', '.details-toggle', toggleDetails);

		$cart.on('click', '.cart-item__less', decreaseQty);

		$cart.on('click', '.cart-item__plus', increaseQty);

		$cart.on('click', '.cart-item__remove', removeItem);

	});


	// ---------  Functions --------- //

	function toggleCart() {

		let cartDuration = .7;
		let overlayDuration = .5;

		if ($cart.hasClass('visible')) {
			if (!TweenMax.isTweening($cart)) {
				$body.removeClass('no-scroll');
				$cart.removeClass('visible');
				$cartOverlay.removeClass('cart-toggle');

				TweenMax.to($cart, cartDuration, {right: '-650px', ease: Back.easeIn.config(1.2)});
				TweenMax.to($cartOverlay, overlayDuration, {display: 'none', opacity: 0});
				
			}
			
		}
		else {
			if (!TweenMax.isTweening($cart)) {
				TweenMax.to($cart, cartDuration, {right: '-50px', ease: Back.easeOut.config(1.2)});
				$cart.addClass('visible');
				$cartOverlay.addClass('cart-toggle');

				TweenMax.to($cartOverlay, overlayDuration, {display: 'block', opacity: .8, autoAlpha: 1});
				$body.addClass('no-scroll');
			}
		}
	}

	function toggleDetails(e) {
		console.log(e.target);

		if ($(e.target).hasClass('shop-item__details')) {
			var idNum = getItemIdNum($(e.target).closest('.shop-item'));

			for (let item of shopData.items) {
				if (item.id == idNum) {
					let itemDetailsHTML = detailsTemplate(item);
					$detailsModal.html(itemDetailsHTML);
					break;
				}	
			}
		}

		let detailsAnimation = new TimelineMax();

		if ($detailsModal.hasClass('visible')) {
			if(!TweenMax.isTweening($detailsModal) && !TweenMax.isTweening($detailsOverlay)) {
				$body.removeClass('no-scroll');
				$detailsOverlay.removeClass('details-toggle');
				$detailsModal.removeClass('visible');

				detailsAnimation
				.to($detailsModal, .3, {
					display: 'none',
					y: '+=75px',
					autoAlpha: 0
				})
				.to($detailsOverlay, .3, { 
					display: 'none',
					autoAlpha: 0 
				});
			}
		}
		else {
			if (!TweenMax.isTweening($detailsModal) && !TweenMax.isTweening($detailsOverlay)) {
				$body.addClass('no-scroll');
				$detailsOverlay.addClass('details-toggle');
				$detailsModal.addClass('visible');
					
				detailsAnimation
				.to($detailsOverlay, .3, { 
					display: 'block',
					autoAlpha: .8 })
				.to($detailsModal, .5, {
					display: 'block',
					y: '-=75px',
					autoAlpha: 1
				});
			}
		}
	}

	function decreaseQty(e) {
		var idNum = getItemIdNum($(e.target).closest('.cart-item'));

		for (let item of cartData.items) {
			if (item.id == idNum) {
				if (item.qty > 1) {
					item.qty--;
					updateCartList();
					localStorage.setItem('cartData', JSON.stringify(cartData));
				}
				else if (confirm('Do you want to remove ' + item.title + ' from the cart?')) {
					let index = cartData.items.indexOf(item);
					cartData.items.splice(index, 1);
					updateCartList();
					localStorage.setItem('cartData', JSON.stringify(cartData));
				}

				break;
			}
		}
	}

	function increaseQty(e) {
		var idNum = getItemIdNum($(e.target).closest('.cart-item'));

		for (let item of cartData.items) {
			if (item.id == idNum) {
				item.qty++;
				updateCartList();
				localStorage.setItem('cartData', JSON.stringify(cartData));
				break;
			}
		}
	}

	function removeItem(e) {
		var idNum = getItemIdNum($(e.target).closest('.cart-item'));

		for (let item of cartData.items) {
			if (item.id == idNum) {
				if (confirm('Do you want to remove ' + item.title + ' from the cart?')) {
					let index = cartData.items.indexOf(item);
					cartData.items.splice(index, 1);
					updateCartList();
					localStorage.setItem('cartData', JSON.stringify(cartData));
				}
				break;
			}
		}
	}

	// Update cart 
	function updateCartList() {

		// Calculate total price and total number of items in cart
		totalPriceNum = 0;
		totalCartItems = 0;

		for (var i = 0, len = cartData.items.length; i < len; i++) {
			var cartItem = cartData.items[i];
			totalPriceNum += cartItem.price * cartItem.qty;
			totalCartItems += cartItem.qty;	
		}

		$cartNumElm.text(totalCartItems);
		$totalPriceElem.text(totalPriceNum.toFixed(2));

		var cartHTML = cartTemplate(cartData);
		$cartList.html(cartHTML);
	}

	function getItemIdNum(element) {
		var itemId = element.attr('id');
		var idNum = parseInt(itemId.replace(/[^0-9]/gi, ''));

		return idNum;
	}

	
})(jQuery, Handlebars, TweenMax);