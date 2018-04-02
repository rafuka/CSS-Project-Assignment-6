

var shopItems = document.getElementsByClassName("product");
var cart = document.getElementById("cart");
var cartContainer = document.getElementById("cart-container");
var shop = document.getElementById("grid");
var openCartBtn = document.getElementById("open-cart-btn");
var closeCartBtn = document.getElementById("close-cart-btn");
var coupon1 = "DEADBEEF"; // 10% off a particular item
var coupon2 = "BLAHBLAH"; // 15% off items that cost more than 10$
var coupon3 = "YADAYADA"; // 5% off the total price

var couponElement = document.querySelector('#coupon');

var totalPrice = 0;
var cartList = [
	{
		id: 'product-1',
		cartId: 'cart-product-1',
		title: 'Buggawatts',
		desc: '',
		price: 10,
		img: 'http://placehold.it/200x200',
		qty: 1
	},
	{
		id: 'product-4',
		cartId: 'cart-product-4',
		title: 'Jawaka',
		desc: '',
		price: 9.99,
		img: 'http://placehold.it/200x200',
		qty: 1
	},
	{
		id: 'product-2',
		cartId: 'cart-product-2',
		title: 'Schwein',
		desc: '',
		price: 12,
		img: 'http://placehold.it/200x200',
		qty: 1
	}
];

updateTotalPrice();
updateCartNumber();


// Displays the cart
function openCart(e) {

	cart.classList.add("visible");
	document.body.classList.add("popup");
}

// Closes cart and displays shop
function closeCart(e) {

	cart.classList.remove("visible");
	document.body.classList.remove("popup");
}		

// Adds an element to the cart. If the cart already contains that element, then increase quantity by 1, 
//     else create a new cart item and add it to the cart item's list
function addToCart(shopElement) {

	for (var i in cartList) {

		if (cartList[i].id == shopElement.id) {
			cartList[i].qty++;
			// update quantity value on cart
			document.querySelector('#' + cartList[i].cartId + ' .quantity input').value++;
			updateTotalPrice();
			updateCartNumber();
			return;
		}
	}

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
			if (cartList[i].title === 'Buggawatts') {

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

// Creates a new cart item using the information of the passed shopElement, then adds it to the list,
//     then creates an HTML element for the cart item and appends it to the cart.
function createNewCartItem(shopElement) {

	var newCartItem = {

		id: shopElement.id,
		cartId: 'cart-' + shopElement.id,
		title: shopElement.querySelector('.product-title').innerHTML,
		img: shopElement.querySelector('.product-img').getAttribute('src'),
		desc: shopElement.querySelector('.product-description').innerHTML,
		price: shopElement.querySelector('.product-price').innerHTML,
		qty: 1
	};

	cartList.push(newCartItem);

	// Parent element
	var newCartElement = document.createElement("article");

	newCartElement.className = "cart-product";
	newCartElement.id = newCartItem.cartId;

	// Level 1 children
	var newImg = document.createElement("img");

	newImg.className = "product-img";
	newImg.src = newCartItem.img;
	newImg.title = "product image";
	newImg.alt = "product image";

	var newDesc = document.createElement("div");

	newDesc.className = "description";

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

	var newTitleText = document.createTextNode("" + newCartItem.title);
	var newDescText = document.createTextNode("" + newCartItem.desc);
	var newPriceText = document.createTextNode("Price");
	var newPriceNum = document.createTextNode("" + newCartItem.price + "$");
	var newQtyText = document.createTextNode("Quantity");
	var newLess = document.createTextNode("-");
	newLess.className = "less";
	var newPlus = document.createTextNode("+");
	newPlus.className = "plus";
	var newRemoveText = document.createTextNode("Remove from Cart");

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
						"' from your Cart?"))
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


openCartBtn.addEventListener("click", openCart, false);
closeCartBtn.addEventListener("click", closeCart, false);

shop.addEventListener("click", function(e) {
	if (e.target.classList.contains('add-to-cart')) {
		
		var shopElement = e.target.parentNode;
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



