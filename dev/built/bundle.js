


  let shopData = {};  // will contain the shop items' data.
  let cartData = {};  // will contain the cart items' data.
  let totalCartItems = 0;
  let totalPriceNum = 0;


  
  // ------- Handlebars Templates & Helpers ------- //

  let shopTemplateHTML = $('#shop-template').html();
  let shopTemplate = Handlebars.compile(shopTemplateHTML);

  let cartTemplateHTML = $('#cart-template').html();
  let cartTemplate = Handlebars.compile(cartTemplateHTML);

  let detailsTemplateHTML = $('#item-details-template').html();
  let detailsTemplate = Handlebars.compile(detailsTemplateHTML);


  // ------- jQuery Elements ------- //

  let $body = $('body');
  let $totalPriceElem = $('#total-price');
  let $shop = $('#shop');
  let $shopList = $('#shop-list');
  let $cart = $('#cart');
  let $cartList = $('#cart-list');
  let $cartOverlay = $('#cart-overlay');
  let $cartNumElm = $('#cart-num');
  let $cartIcon = $('#cart-icon');
  let $loadingModal = $('#loading-modal');
  let $loader = $('#loader');
  let $detailsModal = $('#item-details-modal');
  let $detailsOverlay = $('#details-overlay');
  let $applyCouponBtn = $('.cart-footer__coupon-apply');
  let $couponInput = $('#coupon');


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
  $.getJSON("shopdata.json", data => {

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

    let cartDuration = .7;
    let overlayDuration = .8;

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

        let $carousel = $detailsModal.find('.carousel');

        $carousel.unbind('click', handleNextImage);

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

        let $images = $detailsModal.find('.carousel__image');
        $images.first().addClass('visible');
        TweenMax.to($images.first(), 0, {
          display: 'block',
          autoAlpha: 1
        });

        let imgArr = $images.toArray();
        let carouselAnimation = new TimelineMax();
        let $carousel = $detailsModal.find('.carousel');

        let eventData = {
          imgArr: imgArr,
          animation: carouselAnimation,
          $carousel: $carousel
        }

        $carousel.bind('click', eventData, handleNextImage);
          
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

  function addItem(e) {
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
    
  }

  function decreaseQty(e) {
    var idNum = getItemIdNum($(e.target).closest('.cart-item'));

    for (let item of cartData.items) {
      if (item.id == idNum) {
        if (item.qty > 1) {
          item.qty--;
          updateCartList();
        }
        else if (confirm('Do you want to remove ' + item.title + ' from the cart?')) {
          let index = cartData.items.indexOf(item);
          cartData.items.splice(index, 1);
          updateCartList();
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
        }
        break;
      }
    }
  }

  // Update cart 
  function updateCartList() {

    // Calculate total price and total number of items in cart
    let prevPrice = totalPriceNum;
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
          totalPriceNum = totalPriceNum - (totalPriceNum * .15);
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
    let imgArr = e.data.imgArr;
    let animation = e.data.animation;
    let $carousel = e.data.$carousel;
    let currImg = 0;
    let nextImgRight = 0;
    let nextImgLeft = 0;

    for (let i = 0; i < imgArr.length; i++) {
      if ($(imgArr[i]).hasClass('visible')) {
        currImg = i;
        nextImgRight = i + 1 >= imgArr.length ? 0 : i + 1;
        nextImgLeft = i - 1 < 0 ? imgArr.length - 1 : i - 1;
      }
    }

    if ($(e.target).hasClass('carousel__control-right')) {
      // Next image right
      displayNextImage(imgArr, animation, currImg, nextImgRight);          
      
    }
    else if ($(e.target).hasClass('carousel__control-left')){
      // Next image left
      displayNextImage(imgArr, animation, currImg, nextImgLeft); 
    }

  }

  function displayNextImage(imgArr, animation, currImg, nextImg) {
    animation
    .to($(imgArr[currImg]), .3, {
      display: 'none',
      autoAlpha: 0
    })
    .to($(imgArr[nextImg]), .3, {
      display: 'block',
      autoAlpha: 1
    });

    $(imgArr[currImg]).removeClass('visible');
    $(imgArr[nextImg]).addClass('visible'); 
  }

  function handleCoupon(e) {
    let couponCode = $couponInput.val();

    switch (couponCode) {
      case 'DEADBEEF' :
        cartData.coupon = 'DEADBEEF';
        updateCartList();
        break;
      case 'BLAHBLAH':
        cartData.coupon = 'BLAHBLAH';
        updateCartList();
        break;
    }
  }

