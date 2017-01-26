var shopItems = document.getElementsByClassName("product");
console.log(shopItems);

var cartBtn = document.getElementById("cart-btn");
var cart = document.getElementById("cart");

cartBtn.addEventListener("click", openCart, false);

function openCart(e) {

	cart.classList.add("visible");
	document.body.classList.add("popup");
}

function closeCart(e) {

	cart.classList.remove("visible");
	document.body.classList.remove("popup");
}