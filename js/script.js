// select name text field and set focus 
$('#name').focus();

// hide other-title section
const otherTitle = $('#other-title').hide();

// add event listener on change in dropdown menu; if 'other' option is selected, show 'other title' text field
$('#title').on('change', () => {
	if($('#title option:selected').text() === 'Other') {
		otherTitle.show();
	}
});
