
var stickyNotesSwitch = document.getElementById('sticky-note-switch');
var stickyPacks = document.getElementsByClassName('izi-sticky-pack');

console.log('hi');
stickyNotesSwitch.addEventListener('change', function(e) {

	if (stickyNotesSwitch.checked) {

		for (var i = 0; i < stickyPacks.length; i++) {
			stickyPacks[i].style.display = 'inline-block';
		}
	}
	else {

		for (var i = 0; i < stickyPacks.length; i++) {
			stickyPacks[i].style.display = 'none';
		}
	}
});


