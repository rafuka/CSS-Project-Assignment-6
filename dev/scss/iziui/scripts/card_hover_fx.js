(function() {
	var cards = document.getElementsByClassName('card--hover-fx');
	var bodyRect = document.body.getBoundingClientRect();

	for (var i = 0; i < cards.length; i++) {
		(function() {
			cards[i].addEventListener('mousemove', function(e) {
				
				var card   = e.currentTarget.getBoundingClientRect();
				var cardX  = card.left - bodyRect.left;
				var cardY  = card.top - bodyRect.top;
				var mouseX = e.pageX - cardX;
				var mouseY = e.pageY - cardY;

				var angleX = ((mouseX * -2/card.width) + 1);
				var angleY = ((mouseY * -2/card.height) + 1);
				var shadowX = mouseX;
				var shadowY = mouseY;

				e.currentTarget.style.transform = 'rotate3d(' + angleX + ',' + angleY + ', 0, 10deg)';

			}, false);

			cards[i].addEventListener('mouseleave', function(e) {

				var card = e.currentTarget;

				card.style.boxShadow = '0px 0px 4px rgba(0,0,0,0.4)';
				card.style.transform = 'rotateX(0deg)';

			}, false);
		})();
	}
})();

