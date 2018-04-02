(function() {

	var accordionsMultiple = document.getElementsByClassName('accordion--multiple');
	var accordionsSingle = document.getElementsByClassName('accordion--single');

	var tabs = document.getElementsByClassName('accordion__tab');
	var panels = document.getElementsByClassName('accordion__panel');

	// There should be the same number of tabs and panels
	for (var i = 0; i < panels.length; i++) {
		tabs[i].panel = panels[i];
		panels[i].tab = tabs[i];
		panels[i].panelHeight = panels[i].offsetHeight;
		panels[i].style.height = '0px';
		panels[i].expanded = false;
	}

	function toggle(tab) {
		if (tab.panel.expanded !== false) {
			tab.panel.style.height = '0px';
			tab.panel.expanded = false;
		}
		else {
			tab.panel.style.height = tab.panel.panelHeight + 'px';
			tab.panel.expanded = true;
		}
	}

	// Add event listeners to all multiple-panel accordions
	for (var i = 0; i < accordionsMultiple.length; i++) {
		(function(index) {
			accordionsMultiple[index].addEventListener('click', function(e) {
				if (e.target.classList.contains('accordion__tab')) {
					toggle(e.target);
				}
			});
		})(i);
	}

	// Add event listeners to all single-panel accordions
	for (var i = 0; i < accordionsSingle.length; i++) {
		(function(index) {
			accordionsSingle[index].addEventListener('click', function(e) {
				if (e.target.classList.contains('accordion__tab')) {
					for (var i = 0; i < this.children.length; i++) {
						var tab = this.children[i];
						if (tab.classList.contains('accordion__tab') && tab !== e.target) {
							if (tab.panel.expanded === true) {
								tab.panel.style.height = '0px';
								tab.panel.expanded = false;
							}
						}
					}
					toggle(e.target);
				}
			});
		})(i);
	}
})();