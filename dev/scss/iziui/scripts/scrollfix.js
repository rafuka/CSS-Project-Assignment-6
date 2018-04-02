// Remembers the scroll position in order to 
// maintain it when the body's height changes

/*
(function(){

	// Listen to the height of a given element
	function onHeightChange(element, callback) {
		var lastHeight = element.clientHeight;
		var currentHeight;

		(function listen() {
			currentHeight = element.clientHeight;

			if(currentHeight !== lastHeight) {
				callback(currentHeight, lastHeight);
			}
			lastHeight = currentHeight;

			if (element.onHeightChangeTimer) {
				clearTimeout(element.onHeightChangeTimer)
			}

			element.onHeightChangeTimer = setTimeout(listen, 200);

		})();
	}

	var scrollfixElement = document.getElementById('scrollfix');

	if (scrollFixElement) {
		onHeightChange(scrollFixElement, function(currHeight, lastHeight) {
			console.log(window.scrollY);

			if (currHeight < lastHeight)
				window.scrollTo(0, window.scrollY + ( currHeight - lastHeight ) );
			
		});
	}
	

})();
*/