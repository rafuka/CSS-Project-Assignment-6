(function() {

	var tabs = document.getElementsByClassName('tabs__tab');

	function togglePanel(tab) {
		var allTabs = tab.parentElement.children;
		var panelId = tab.getAttribute('data-controls');
		var panel = document.getElementById(panelId);
		var allPanels = panel.parentElement.children;


		for (var i = 0; i < allTabs.length; i++) {
			allTabs[i].classList.remove('tabs__tab--active');
		}

		tab.classList.add('tabs__tab--active');

		
		for (var i = 0; i < allPanels.length; i++) {
			allPanels[i].classList.remove('tabs__panel--visible');
		}

		panel.classList.add('tabs__panel--visible');
		setTimeout(function() {
			panel.parentElement.scrollTop = 0;
		}, 100);
	}

	for (var i = 0; i < tabs.length; i++) {
		(function(i) {
			tabs[i].addEventListener('click', function() {

				if (!this.classList.contains('tabs__tab--active')) {
					togglePanel(this);
				}			
			});
		})(i);
	}
})();