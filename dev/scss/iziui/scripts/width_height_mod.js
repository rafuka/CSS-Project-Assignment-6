(function() {
	var width_mod = document.getElementsByClassName('js-modifier-width');
	var height_mod = document.getElementsByClassName('js-modifier-height');


	/*  
	*	Get the parent elements' offset width and height and set it as a css style
	*	and set the checked property to false
	*/	

	for (var i = 0; i < width_mod.length; i++) {
		width_mod[i].checked = false;
		width_mod[i].initialWidth = width_mod[i].parentElement.offsetWidth;
		width_mod[i].parentElement.style.width = width_mod[i].initialWidth +'px';
	}

	for (var i = 0; i < height_mod.length; i++) {
		height_mod[i].checked = false;
		height_mod[i].initialHeight = height_mod[i].parentElement.offsetHeight;
		height_mod[i].parentElement.style.height = height_mod[i].initialHeight +'px';
	}


	/* 
	*	Set event listeners to each modifier
	*/

	for (var i = 0; i < width_mod.length; i++) {
		
		width_mod[i].addEventListener('change', function() {
			

			if (this.checked) {
				this.parentElement.style.width = '150px';
			}
			else {
				this.parentElement.style.width = this.initialWidth + 'px';
		
			}
		});
	}

	for (var i = 0; i < height_mod.length; i++) {
		height_mod[i].addEventListener('change', function() {
			if (this.checked) {
				this.parentElement.style.height = '150px';
			}
			else {
				this.parentElement.style.height = this.initialHeight + 'px';
		
			}
		});
	}
})();


