var shopItems = document.getElementsByClassName("product");
console.log(shopItems);

var cart = document.getElementById("cart-container");
var shop = document.getElementById("grid");
var openCartBtn = document.getElementById("open-cart-btn");
var closeCartBtn = document.getElementById("close-cart-btn");
var coupon = "BLAHBLAH";

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

shop.addEventListener("click", function(e) {
	if (e.target.classList.contains('add-to-cart')) {
		console.log("ADD");

		
		var shopElement = e.target.parentNode;
		console.log(shopElement.id);

		console.log(shopElement.querySelector('.product-title').innerHTML);
	}
});

function openCart(e) {

	cart.classList.add("visible");
	document.body.classList.add("popup");
}

function closeCart(e) {

	cart.classList.remove("visible");
	document.body.classList.remove("popup");
}		

function addToCart(item) {

}


openCartBtn.addEventListener("click", openCart, false);
closeCartBtn.addEventListener("click", closeCart, false);

