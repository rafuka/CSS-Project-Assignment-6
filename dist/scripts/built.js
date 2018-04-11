

var shopItems 		= document.getElementsByClassName("product");
var cart 			= document.getElementById("cart");
var cartContainer 	= document.getElementById("cart-container");
var shop 			= document.getElementById("shop-listing");
var toggleCartBtns 	= document.getElementsByClassName("toggle-cart-btn");
var coupon1 		= "DEADBEEF"; // 10% off a particular item
var coupon2 		= "BLAHBLAH"; // 15% off items that cost more than 10$
var coupon3 		= "YADAYADA"; // 5% off the total price

var couponElement 	= document.querySelector('#coupon');

var totalPrice 		= 0;
var cartList 		= [
	{
		id: 'product-8',
		cartId: 'cart-product-8',
		title: 'Item 8',
		desc: '',
		price: 19.99,
		img: 'dist/assets/placeholder450x450.png',
		qty: 1
	},
	{
		id: 'product-5',
		cartId: 'cart-product-5',
		title: 'Item 5',
		desc: '',
		price: 19.99,
		img: 'dist/assets/placeholder450x450.png',
		qty: 1
	},
	{
		id: 'product-3',
		cartId: 'cart-product-3',
		title: 'Item 3',
		desc: '',
		price: 19.99,
		img: 'dist/assets/placeholder450x450.png',
		qty: 1
	}
];

/* TEST var cartListLength = cartList.length;

for (var i = 0; i < cartListLength; i++) {
	var shopElement = document.getElementById(cartList[i].id);
	//console.log(shopElement);
	createNewCartItem(shopElement);
	updateTotalPrice();
	updateCartNumber();
} */

/*updateTotalPrice();
updateCartNumber();*/


// Displays the cart
function toggleCart(e) {

	cart.classList.toggle("visible");
	shop.classList.toggle("visible");
	//document.body.classList.toggle("popup");
}

		

// Adds an element to the cart. If the cart already contains that element, then increase quantity by 1, 
//     else create a new cart item and add it to the cart item's list
function addToCart(shopElement) {
	//console.log(shopElement);

	for (var i = 0; i < cartList.length; i++) {

		var cartItem = cartList[i];

		if (cartItem.id === shopElement.id) {
			cartItem.qty++;
			var qtty = document.querySelector('#' + cartList[i].cartId + ' .quantity input');
			if (qtty) qtty.value++;
			updateTotalPrice();
			updateCartNumber();
			return;
		}
	}
	console.log('oh naw');
	/*for (var i in cartList) {
		console.log(i);
		if (cartList[i].id == shopElement.id) {
			console.log('inside if');
			cartList[i].qty++;
			console.log(cartList[i].qty);
			// update quantity value on cart
			var val = document.querySelector('#' + cartList[i].cartId + ' .quantity input');
			if (val) val.value++;
			updateTotalPrice();
			updateCartNumber();
			return;
		}
	}*/

	createNewCartItem(shopElement);
	updateTotalPrice();
	updateCartNumber();
	return;
}

// Updates and displays the total price. Check for coupons before calculating the price.
function updateTotalPrice() {
	
	totalPrice = 0;

	if (couponElement.value === coupon1) {

		for (var i in cartList) {
			if (cartList[i].id === 'product-1') {

				totalPrice += (cartList[i].price * cartList[i].qty) - (cartList[i].price * cartList[i].qty * 0.1);
			}
			else {
				totalPrice += (cartList[i].price * cartList[i].qty);
			}
		}
	}

	else if (couponElement.value === coupon2) {
		for (var i in cartList) {
			if (cartList[i].price >= 10.0) {
				totalPrice += ((cartList[i].price * cartList[i].qty) - (cartList[i].price * cartList[i].qty * 0.15));
			}
			else {
				totalPrice += (cartList[i].price * cartList[i].qty);
			}
		}
	}

	else if (couponElement.value === coupon3) {
		for (var i in cartList) {
			totalPrice += (cartList[i].price * cartList[i].qty);
		}

		totalPrice -= totalPrice * 0.05;
	}

	else {
		for (var i in cartList) {
			totalPrice += (cartList[i].price * cartList[i].qty);
		}
	}

	document.querySelector('#total-price p').innerHTML = totalPrice.toFixed(2) + '$';
}

// Creates a new cart item using the information of the shopElement parameter, then adds it to the list,
//     creates an HTML element for the cart item, and appends it to the cart.
function createNewCartItem(shopElement) {

	var newCartItem = {

		id: shopElement.id,
		cartId: 'cart-' + shopElement.id,
		title: shopElement.querySelector('.shop-item__title').innerHTML,
		img: shopElement.querySelector('.shop-item__image').getAttribute('src'),
		desc: shopElement.querySelector('.shop-item__description').innerHTML,
		price: shopElement.querySelector('.shop-item__price').innerHTML,
		qty: 1
	};


	cartList.push(newCartItem);

	// Parent element
	var newCartElement = document.createElement("article");

	newCartElement.className = 'shop-item';
	newCartElement.id = newCartItem.cartId;

	// Level 1 children
	var newImg = document.createElement("img");

	newImg.className = "shop-item__img";
	newImg.src = newCartItem.img;
	newImg.title = "product image";
	newImg.alt = "product image";

	var newDesc = document.createElement("div");

	newDesc.className = "shop-item__description";

	var newPrice = document.createElement("div");

	newPrice.className = "price";

	var newQty = document.createElement("div");

	newQty.className = "quantity";

	var newBtnWrap = document.createElement("div");

	newBtnWrap.className = "button-wrap";

	// Level 2 children

	var newProductTitle = document.createElement("h2");

	newProductTitle.className = "product-title";

	var newProductDesc = document.createElement("p");

	newProductDesc.className = "product-description";

	var newPriceH2 = document.createElement("h2");

	var newPriceP = document.createElement("p");

	var newQtyH2 = document.createElement("h2");

	var newLessBtn = document.createElement("button");
	newLessBtn.className = "less";

	var newQtyInput = document.createElement("input");

	newQtyInput.className = "qnum";
	newQtyInput.type = "number";
	newQtyInput.name = "product-quantity";
	newQtyInput.value = "1";
	newQtyInput.disabled = "disabled";

	var newPlusBtn = document.createElement("button");
	newPlusBtn.className = "plus";

	var newRemoveBtn = document.createElement("button");

	newRemoveBtn.className = "remove";

	// Text nodes

	var newTitleText 	= document.createTextNode("" + newCartItem.title);
	var newDescText 	= document.createTextNode("" + newCartItem.desc);
	var newPriceText 	= document.createTextNode("Price");
	var newPriceNum 	= document.createTextNode("" + newCartItem.price + "$");
	var newQtyText 		= document.createTextNode("Quantity");
	var newLess 		= document.createTextNode("-");
	newLess.className 	= "less";
	var newPlus 		= document.createTextNode("+");
	newPlus.className 	= "plus";
	var newRemoveText 	= document.createTextNode("Remove from Cart");

	// Append text nodes to level 2 children

	newProductTitle.appendChild(newTitleText);
	newProductDesc.appendChild(newDescText);
	newPriceH2.appendChild(newPriceText);
	newPriceP.appendChild(newPriceNum);
	newQtyH2.appendChild(newQtyText);
	newLessBtn.appendChild(newLess);
	newPlusBtn.appendChild(newPlus);
	newRemoveBtn.appendChild(newRemoveText);

	// Append level 2 children to level 1 children

	newDesc.appendChild(newProductTitle);
	newDesc.appendChild(newProductDesc);

	newPrice.appendChild(newPriceH2);
	newPrice.appendChild(newPriceP);

	newQty.appendChild(newQtyH2);
	newQty.appendChild(newLessBtn);
	newQty.appendChild(newQtyInput);
	newQty.appendChild(newPlusBtn);

	newBtnWrap.appendChild(newRemoveBtn);

	// Append level 1 children to parent element

	newCartElement.appendChild(newImg);
	newCartElement.appendChild(newDesc);
	newCartElement.appendChild(newPrice);
	newCartElement.appendChild(newQty);
	newCartElement.appendChild(newBtnWrap);

	// Append new cart element to cart container

	cartContainer.appendChild(newCartElement);
}

// Removes an item from the cart's list and from the cart. Then updates the total price.
function removeFromCart(cartElement) {
	for (var i in cartList) {
		if (cartList[i].cartId === cartElement.id) {
			if (confirm("Are you sure you want to remove the item '" + 
						cartElement.querySelector('.product-title').innerHTML +
						"' from your Cart?")
			)
			{
				cartList.splice(i, 1);
				cartElement.parentNode.removeChild(cartElement);
				updateTotalPrice();
				updateCartNumber();
				return true;
			}
		}
	}

	return false;
}

// Updates the number in the open cart button
function updateCartNumber() {
	var totalItems = 0;
	for (var i in cartList) {
		totalItems += cartList[i].qty;
	}

	var cartNum = document.getElementById("cart-num");
	cartNum.innerHTML = totalItems;
}


for (var i = 0; i < toggleCartBtns.length; i++) {
	(function(i){
		toggleCartBtns[i].addEventListener("click", toggleCart, false);
	})(i);
}


  

shop.addEventListener("click", function(e) {
	if (e.target.classList.contains('add-to-cart-btn')) {

		var shopElement = e.target.parentNode.parentNode;
		addToCart(shopElement);
	}
});

cart.addEventListener("click", function(e) {
	if (e.target.classList.contains('remove')) {

		var cartElement = e.target.parentNode.parentNode;
		removeFromCart(cartElement);
	}

	if (e.target.classList.contains('less')) {

		var cartElement = e.target.parentNode.parentNode;
		
		for (var i in cartList) {
			if (cartList[i].cartId === cartElement.id) {
				if (cartList[i].qty >= 1) {
					
					cartList[i].qty--;		
					document.querySelector('#' + cartElement.id + ' .quantity input').value--;
				}

				if (cartList[i].qty == 0) {

					if (!removeFromCart(cartElement)) {
						cartList[i].qty = 1;
						document.querySelector('#' + cartElement.id + ' .quantity input').value = 1;
					}
				}
			}
		}
		updateTotalPrice();
		updateCartNumber();
	}

	if (e.target.classList.contains('plus')) {

		var cartElement = e.target.parentNode.parentNode;

		for (var i in cartList) {
			if (cartList[i].cartId === cartElement.id) {
				cartList[i].qty++;
				document.querySelector('#' + cartElement.id + ' .quantity input').value++;
				updateTotalPrice();
				updateCartNumber();
			}
		}
	}
});

couponElement.addEventListener("input", function(e) {
	if (couponElement.value === coupon1 ||
		couponElement.value === coupon2 ||
		couponElement.value === coupon3)
	{
		couponElement.style.backgroundColor = "#8f8";
	}
	else {
		couponElement.style.backgroundColor = "#fff";
	}

	updateTotalPrice();
});



