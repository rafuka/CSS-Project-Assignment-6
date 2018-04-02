(function() {
	var modalTriggers = document.getElementsByClassName('modal-trigger');
	var modals = document.getElementsByClassName('modal');


	// Associate modal triggers with their corresponding modals
	for (var i = 0; i < modalTriggers.length; i++) {
		modalTriggers[i].modal = modalTriggers[i].nextElementSibling;
	}


	// Add event listener to triggers to activate modals
	for (var i = 0; i < modalTriggers.length; i++) {
		(function(i) {
			modalTriggers[i].addEventListener('click', function() {
				var trigger = this;

				trigger.modal.style.display = 'block';
				trigger.modal.offsetWidth; // forces a reflow

				trigger.modal.classList.add('modal--visible');
				document.body.classList.add('no-scroll');
			});

			var closeBtns = modalTriggers[i].modal.getElementsByClassName('modal__close');

			for (var j = 0; j < closeBtns.length; j++) {
				(function(j) {
					closeBtns[j].addEventListener('click', function() {
						modalTriggers[i].modal.classList.remove('modal--visible');
						modalTriggers[i].modal.style.display = 'none';
						document.body.classList.remove('no-scroll');
					});
				})(j);
			}
			
		})(i);
	}

})();