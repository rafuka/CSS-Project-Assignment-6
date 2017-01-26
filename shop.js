var shopItems = document.getElementsByClassName("product");
console.log(shopItems);

var cart = document.getElementById("cart");
var openCartBtn = document.getElementById("open-cart-btn");
var closeCartBtn = document.getElementById("close-cart-btn");

function openCart(e) {

	cart.classList.add("visible");
	document.body.classList.add("popup");
}

function closeCart(e) {

	cart.classList.remove("visible");
	document.body.classList.remove("popup");
}		

openCartBtn.addEventListener("click", openCart, false);
closeCartBtn.addEventListener("click", closeCart, false);

var cartList = [
	{
		title: 'Buggawats',
		desc: '',
		price: '',
		img: '',
		qty: 0
	},
	{},
	{},
	{},
	{},
	{},
	{},
	{},
	{},
	{}
];