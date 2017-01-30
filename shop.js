var shopItems = document.getElementsByClassName("product");
var cart = document.getElementById("cart");
var cartContainer = document.getElementById("cart-container");
var shop = document.getElementById("grid");
var openCartBtn = document.getElementById("open-cart-btn");
var closeCartBtn = document.getElementById("close-cart-btn");
var coupon = "DEADBEEF";
var couponElement = document.querySelector('#coupon');

var totalPrice = 0;
var cartList = [
	{
		id: 'product-1',
		cartId: 'cart-product-1',
		title: 'Buggawats',
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

function openCart(e) {

	cart.classList.add("visible");
	document.body.classList.add("popup");
}

function closeCart(e) {

	cart.classList.remove("visible");
	document.body.classList.remove("popup");
}		

function addToCart(shopElement) {

	for (var i in cartList) {

		if (cartList[i].id == shopElement.id) {
			cartList[i].qty++;
			// update quantity value on cart
			document.querySelector('#' + cartList[i].cartId + ' .quantity input').value++;
			updateTotalPrice();
			return;
		}
	}

	
	createNewCartItem(shopElement);
	updateTotalPrice();
	return;
}

function updateTotalPrice() {
	totalPrice = 0;
	for (var i in cartList) {
		totalPrice += (cartList[i].price * cartList[i].qty);
	}

	if (couponElement.value === coupon) {
		totalPrice -= totalPrice * 0.1;
	}

	document.querySelector('#total-price p').innerHTML = totalPrice.toFixed(2) + '$';
}

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

function removeFromCart(cartElement) {
	for (var i in cartList) {
		if (cartList[i].cartId === cartElement.id) {
			if (confirm("Are you sure you want to remove the item '" + 
						cartElement.querySelector('.product-title').innerHTML +
						"' from your Cart?"))
			{
				cartList.splice(i, 1);
				cartElement.parentNode.removeChild(cartElement);			
			}
		}
	}

	updateTotalPrice();
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
				if (cartList[i].qty > 1) {
					cartList[i].qty--;
					document.querySelector('#' + cartElement.id + ' .quantity input').value--;
					updateTotalPrice();
				}
			}
		}	
	}

	if (e.target.classList.contains('plus')) {

		var cartElement = e.target.parentNode.parentNode;

		for (var i in cartList) {
			if (cartList[i].cartId === cartElement.id) {
				cartList[i].qty++;
				document.querySelector('#' + cartElement.id + ' .quantity input').value++;
				updateTotalPrice();
			}
		}
	}
});

couponElement.addEventListener("input", function(e) {
	if (couponElement.value === coupon) {
		couponElement.style.backgroundColor = "#8f8";
	}
	else {
		couponElement.style.backgroundColor = "#fff";
	}

	updateTotalPrice();
	
});



