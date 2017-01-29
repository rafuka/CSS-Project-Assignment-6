var shopItems = document.getElementsByClassName("product");
var cart = document.getElementById("cart");
var shop = document.getElementById("grid");
var openCartBtn = document.getElementById("open-cart-btn");
var closeCartBtn = document.getElementById("close-cart-btn");
var coupon = "BLAHBLAH";

var cartList = [
	{
		id: 'product-1',
		title: 'Buggawats',
		desc: '',
		price: '',
		img: '',
		qty: 1
	}
];

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
			return;
		}
	}

	cartList.push({

		id: shopElement.id,
		title: shopElement.querySelector('.product-title').innerHTML,
		img: shopElement.querySelector('.product-img').getAttribute('src'),
		desc: shopElement.querySelector('.product-description').innerHTML,
		qty: 1
	});

	return;
}

function removeFromCart(cartItem) {
	
}


openCartBtn.addEventListener("click", openCart, false);
closeCartBtn.addEventListener("click", closeCart, false);

shop.addEventListener("click", function(e) {
	if (e.target.classList.contains('add-to-cart')) {
		
		var shopElement = e.target.parentNode;
		console.log(shopElement.id);
		addToCart(shopElement);
		console.log(cartList);

	}
});
