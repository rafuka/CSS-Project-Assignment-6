'use strict';

var shopData = {}; // will contain the shop items' data.
var cartData = {}; // will contain the cart items' data.
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
var $applyCouponBtn = $('.cart-footer__coupon-apply');
var $couponInput = $('#coupon');

/*
* Retrieve cart element's from local storage (if any) and update the cart listing.
*/
if (localStorage.getItem('cartData')) {

  cartData = JSON.parse(localStorage.getItem('cartData'));
  updateCartList();
} else {
  cartData = {
    items: []
  };
}

/*
* Read the shop listing item's data and produce the HTML
*/
$.getJSON("shopdata.json", function (data) {

  shopData = data;
  var shopHTML = shopTemplate(shopData);
  $shopList.html(shopHTML);

  // Just for the thrills.
  setInterval(function () {
    $loader.addClass('success');
    $shop.removeClass('hidden');

    var loaderAnimation = new TimelineMax();

    loaderAnimation.to($loader, .4, {
      border: '0px',
      backgroundColor: 'black',
      animation: 'none',
      rotate: 0 }).to($loader, .7, {
      height: '0px',
      width: '0px',
      display: 'none',
      top: '50%',
      left: '50%',
      ease: Back.easeIn.config(5) }).to($loadingModal, .3, {
      opacity: 0,
      display: 'none'
    }).to($shop, .3, { display: 'block', autoAlpha: 1 });
  }, 800);

  // ------- Event Handlers ------- //

  // Open/Close Cart view.
  $body.on('click', '.cart-toggle', toggleCart);
  $body.on('click', '.details-toggle', toggleDetails);

  $shopList.on('click', '.shop-item__add-btn', addItem);

  $cart.on('click', '.cart-item__less', decreaseQty);
  $cart.on('click', '.cart-item__plus', increaseQty);
  $cart.on('click', '.cart-item__remove', removeItem);

  $applyCouponBtn.on('click', handleCoupon);

  // The event hanlder for the carousel arrow controls is set on the toggleDetails function below.
});

// ---------  Functions --------- //

function toggleCart() {

  var cartDuration = .7;
  var overlayDuration = .8;

  if ($cart.hasClass('visible')) {
    if (!TweenMax.isTweening($cart)) {
      $body.removeClass('no-scroll');
      $cart.removeClass('visible');
      $cartOverlay.removeClass('cart-toggle');

      TweenMax.to($cart, cartDuration, { right: '-650px', ease: Back.easeIn.config(1.2) });
      TweenMax.to($cartOverlay, overlayDuration, { display: 'none', opacity: 0 });
    }
  } else {
    if (!TweenMax.isTweening($cart)) {
      TweenMax.to($cart, cartDuration, { right: '-50px', ease: Back.easeOut.config(1.2) });
      $cart.addClass('visible');
      $cartOverlay.addClass('cart-toggle');

      TweenMax.to($cartOverlay, overlayDuration, { display: 'block', opacity: .8, autoAlpha: 1 });
      $body.addClass('no-scroll');
    }
  }
}

function toggleDetails(e) {

  if ($(e.target).hasClass('shop-item__details')) {
    var idNum = getItemIdNum($(e.target).closest('.shop-item'));

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = shopData.items[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var item = _step.value;

        if (item.id == idNum) {
          var itemDetailsHTML = detailsTemplate(item);
          $detailsModal.html(itemDetailsHTML);
          break;
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  }

  var detailsAnimation = new TimelineMax();

  if ($detailsModal.hasClass('visible')) {
    if (!TweenMax.isTweening($detailsModal) && !TweenMax.isTweening($detailsOverlay)) {
      $body.removeClass('no-scroll');
      $detailsOverlay.removeClass('details-toggle');
      $detailsModal.removeClass('visible');

      var $carousel = $detailsModal.find('.carousel');

      $carousel.unbind('click', handleNextImage);

      detailsAnimation.to($detailsModal, .3, {
        display: 'none',
        y: '+=75px',
        autoAlpha: 0
      }).to($detailsOverlay, .3, {
        display: 'none',
        autoAlpha: 0
      });
    }
  } else {
    if (!TweenMax.isTweening($detailsModal) && !TweenMax.isTweening($detailsOverlay)) {
      $body.addClass('no-scroll');
      $detailsOverlay.addClass('details-toggle');
      $detailsModal.addClass('visible');

      var $images = $detailsModal.find('.carousel__image');
      $images.first().addClass('visible');
      TweenMax.to($images.first(), 0, {
        display: 'block',
        autoAlpha: 1
      });

      var imgArr = $images.toArray();
      var carouselAnimation = new TimelineMax();
      var _$carousel = $detailsModal.find('.carousel');

      var eventData = {
        imgArr: imgArr,
        animation: carouselAnimation,
        $carousel: _$carousel
      };

      _$carousel.bind('click', eventData, handleNextImage);

      detailsAnimation.to($detailsOverlay, .3, {
        display: 'block',
        autoAlpha: .8 }).to($detailsModal, .5, {
        display: 'block',
        y: '-=75px',
        autoAlpha: 1
      });
    }
  }
}

function addItem(e) {
  if (!TweenMax.isTweening($cartIcon)) {
    TweenMax.from($cartIcon, .7, { scale: 1.5, ease: Bounce.easeOut });
  }

  var shopItem = $(e.target).closest('.shop-item');
  var shopItemId = shopItem.attr('id');
  var idNum = parseInt(shopItemId.replace(/[^0-9]/gi, ''));

  // Check if item exists in cart. If not, create it.
  // Else just increase item's qty.
  // Finally, update cart list.

  var itemInCart = false;

  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = cartData.items[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var item = _step2.value;

      if (item.id == idNum) {
        item.qty++;
        itemInCart = true;
        break;
      }
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  if (!itemInCart) {
    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {

      for (var _iterator3 = shopData.items[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
        var _item = _step3.value;

        if (_item.id == idNum) {
          _item.qty = 1;
          cartData.items.unshift(_item);
          break;
        }
      }
    } catch (err) {
      _didIteratorError3 = true;
      _iteratorError3 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion3 && _iterator3.return) {
          _iterator3.return();
        }
      } finally {
        if (_didIteratorError3) {
          throw _iteratorError3;
        }
      }
    }
  }

  updateCartList();
}

function decreaseQty(e) {
  var idNum = getItemIdNum($(e.target).closest('.cart-item'));

  var _iteratorNormalCompletion4 = true;
  var _didIteratorError4 = false;
  var _iteratorError4 = undefined;

  try {
    for (var _iterator4 = cartData.items[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
      var item = _step4.value;

      if (item.id == idNum) {
        if (item.qty > 1) {
          item.qty--;
          updateCartList();
        } else if (confirm('Do you want to remove ' + item.title + ' from the cart?')) {
          var index = cartData.items.indexOf(item);
          cartData.items.splice(index, 1);
          updateCartList();
        }

        break;
      }
    }
  } catch (err) {
    _didIteratorError4 = true;
    _iteratorError4 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion4 && _iterator4.return) {
        _iterator4.return();
      }
    } finally {
      if (_didIteratorError4) {
        throw _iteratorError4;
      }
    }
  }
}

function increaseQty(e) {
  var idNum = getItemIdNum($(e.target).closest('.cart-item'));

  var _iteratorNormalCompletion5 = true;
  var _didIteratorError5 = false;
  var _iteratorError5 = undefined;

  try {
    for (var _iterator5 = cartData.items[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
      var item = _step5.value;

      if (item.id == idNum) {
        item.qty++;
        updateCartList();
        break;
      }
    }
  } catch (err) {
    _didIteratorError5 = true;
    _iteratorError5 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion5 && _iterator5.return) {
        _iterator5.return();
      }
    } finally {
      if (_didIteratorError5) {
        throw _iteratorError5;
      }
    }
  }
}

function removeItem(e) {
  var idNum = getItemIdNum($(e.target).closest('.cart-item'));

  var _iteratorNormalCompletion6 = true;
  var _didIteratorError6 = false;
  var _iteratorError6 = undefined;

  try {
    for (var _iterator6 = cartData.items[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
      var item = _step6.value;

      if (item.id == idNum) {
        if (confirm('Do you want to remove ' + item.title + ' from the cart?')) {
          var index = cartData.items.indexOf(item);
          cartData.items.splice(index, 1);
          updateCartList();
        }
        break;
      }
    }
  } catch (err) {
    _didIteratorError6 = true;
    _iteratorError6 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion6 && _iterator6.return) {
        _iterator6.return();
      }
    } finally {
      if (_didIteratorError6) {
        throw _iteratorError6;
      }
    }
  }
}

// Update cart 
function updateCartList() {

  // Calculate total price and total number of items in cart
  var prevPrice = totalPriceNum;
  totalPriceNum = 0;
  totalCartItems = 0;

  for (var i = 0, len = cartData.items.length; i < len; i++) {
    var cartItem = cartData.items[i];
    totalPriceNum += cartItem.price * cartItem.qty;
    totalCartItems += cartItem.qty;
  }

  $cartNumElm.text(totalCartItems);

  // Check if there is any coupon, apply it.
  if (cartData.coupon) {
    switch (cartData.coupon) {
      case 'DEADBEEF':
        totalPriceNum = totalPriceNum - totalPriceNum * .15;
        break;
      case 'BLAHBLAH':
        totalPriceNum -= 10;
        break;
    }
    if (totalPriceNum < 0) {
      totalPriceNum = 0;
    }
    $('.cart-footer__price').addClass('with-coupon');
  }

  $totalPriceElem.text(totalPriceNum.toFixed(2));

  var cartHTML = cartTemplate(cartData);
  $cartList.html(cartHTML);

  localStorage.setItem('cartData', JSON.stringify(cartData));
}

function getItemIdNum(element) {
  var itemId = element.attr('id');
  var idNum = parseInt(itemId.replace(/[^0-9]/gi, ''));

  return idNum;
}

function handleNextImage(e) {
  var imgArr = e.data.imgArr;
  var animation = e.data.animation;
  var $carousel = e.data.$carousel;
  var currImg = 0;
  var nextImgRight = 0;
  var nextImgLeft = 0;

  for (var i = 0; i < imgArr.length; i++) {
    if ($(imgArr[i]).hasClass('visible')) {
      currImg = i;
      nextImgRight = i + 1 >= imgArr.length ? 0 : i + 1;
      nextImgLeft = i - 1 < 0 ? imgArr.length - 1 : i - 1;
    }
  }

  if ($(e.target).hasClass('carousel__control-right')) {
    // Next image right
    displayNextImage(imgArr, animation, currImg, nextImgRight);
  } else if ($(e.target).hasClass('carousel__control-left')) {
    // Next image left
    displayNextImage(imgArr, animation, currImg, nextImgLeft);
  }
}

function displayNextImage(imgArr, animation, currImg, nextImg) {
  animation.to($(imgArr[currImg]), .3, {
    display: 'none',
    autoAlpha: 0
  }).to($(imgArr[nextImg]), .3, {
    display: 'block',
    autoAlpha: 1
  });

  $(imgArr[currImg]).removeClass('visible');
  $(imgArr[nextImg]).addClass('visible');
}

function handleCoupon(e) {
  var couponCode = $couponInput.val();

  switch (couponCode) {
    case 'DEADBEEF':
      cartData.coupon = 'DEADBEEF';
      updateCartList();
      break;
    case 'BLAHBLAH':
      cartData.coupon = 'BLAHBLAH';
      updateCartList();
      break;
  }
}
//# sourceMappingURL=bundle-babel.js.map
