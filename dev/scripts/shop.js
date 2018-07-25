(function ($, Handlebars) {

	var shopTemplateHTML = document.getElementById('shop-template').innerHTML;
	var shopTemplate = Handlebars.compile(shopTemplateHTML);

	$.getJSON("shopdata.json", function(data) {
		var shopData = shopTemplate(data);
		document.getElementById('shop-list').innerHTML += shopData;

		
	});

	var shopList = $('#shop-list');
	var cartList = $('#cart-list');

	shopList.on('click', '.shop-item__add-btn', function() {
		console.log('buy!');
	});

	shopList.on('click', '.shop-item__details', function() {
		console.log('details');
	});

	console.log(shopList);

	
})(jQuery, Handlebars);