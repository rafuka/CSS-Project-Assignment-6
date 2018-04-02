(function() {
	var carousels = document.getElementsByClassName('carousel');

	for (var i = 0; i < carousels.length; i++) {
		(function(i) {
			var carousel = carousels[i];
			carousel.radios = carousel.getElementsByClassName('carousel__radio');
			carousel.slides = carousel.getElementsByClassName('carousel__slide');
			carousel.labels = carousel.getElementsByClassName('carousel__label');
			carousel.arrowRight = carousel.getElementsByClassName('carousel__arrow-right')[0];
			carousel.arrowLeft = carousel.getElementsByClassName('carousel__arrow-left')[0];

			// Set left and right arrows position based on their height.
			var arrowRightTopPos = (carousel.offsetHeight / 2) - (carousel.arrowRight.offsetHeight / 2);
			var arrowLeftTopPos = (carousel.offsetHeight / 2) - (carousel.arrowLeft.offsetHeight / 2);
			carousel.arrowRight.style.top = arrowRightTopPos + 'px';
			carousel.arrowLeft.style.top = arrowLeftTopPos + 'px';

			// Associate each radio button with its correspondant label and slide
			for (var j = 0; j < carousel.slides.length; j++) {
				carousel.labels[j].radio = document.getElementById(carousel.labels[j].getAttribute('for'));
				document.getElementById(carousel.labels[j].getAttribute('for')).label = carousel.labels[j];

				carousel.radios[j].slide = carousel.radios[j].nextElementSibling;

				carousel.slides[j].radio = carousel.slides[j].previousElementSibling;
			}

			// Add the selected state class to the label of the default selected radio.
			for (var j = 0; j < carousel.radios.length; j++) {
				var radio = carousel.radios[j];
				if (radio.checked) {
					radio.label.classList.add('carousel__label--selected');
				}
				else {
					radio.label.classList.remove('carousel__label--selected');
				}
			}

			// Add the selected state class to the label that corresponds with the checked radio btn.
			for (var j = 0; j < carousel.radios.length; j++) {
				(function(j){
					var radio = carousel.radios[j];

					radio.addEventListener('change', function(e) {

						for (var k = 0; k < carousel.labels.length; k++) {
							var label = carousel.labels[k];
							if (label.getAttribute('for') !== this.id) {
								label.classList.remove('carousel__label--selected');
							}
							else {
								label.classList.add('carousel__label--selected');
							}
						}
					});
				})(j);
			}

			// Change the slide when clicking on an arrow.
			carousel.arrowRight.addEventListener('click', function(e) {
				for (var i = 0; i < carousel.radios.length; i++) {
					var radio = carousel.radios[i];
					var nextRadio = carousel.radios[(i + 1) % carousel.radios.length];
					if (radio.checked) {
						nextRadio.checked = true;

						for (var k = 0; k < carousel.labels.length; k++) {
							var label = carousel.labels[k];
							if (label.getAttribute('for') !== nextRadio.id) {
								label.classList.remove('carousel__label--selected');
							}
							else {
								label.classList.add('carousel__label--selected');
							}
						}

						break;
					}
				}
			});

			carousel.arrowLeft.addEventListener('click', function(e) {
				console.log('left!');
				for (var i = 0; i < carousel.radios.length; i++) {
					var radio = carousel.radios[i];
					var nextRadio = carousel.radios[i - 1 < 0 ? carousel.radios.length - 1 : i - 1];
					if (radio.checked) {
						nextRadio.checked = true;

						for (var k = 0; k < carousel.labels.length; k++) {
							var label = carousel.labels[k];
							if (label.getAttribute('for') !== nextRadio.id) {
								console.log('boom!');
								label.classList.remove('carousel__label--selected');
							}
							else {
								console.log('BAM');
								label.classList.add('carousel__label--selected');
							}
						}
						
						break;
					}
				}
			});

			


			/*for(var j = 0; j < carousels[i].labels.length; j++) {
				(function(j) {
					carousels[i].labels[j].addEventListener('click', function(e) {
						console.log('clicked!');
						var label = e.target;
						console.log(label);
						for (var k = 0; k < carousels[i].labels.length; k++) {
							carousels[i].labels[k].classList.remove('carousel__label--selected');
							label.classList.add('carousel__label--selected');
						}
					});
				})(j);
			}*/
		})(i);	
	}
})();