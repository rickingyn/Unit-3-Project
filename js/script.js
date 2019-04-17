// select name text field and set focus 
$('#name').focus();

// assign 'Other' input to a variable and hide 
const otherTitle = $('#other-title').hide();

// add event listener on change in dropdown menu; 
	// if 'other' option is selected, show 'other title' text field
$('#title').on('change', () => {
	if($('#title option:selected').text() === 'Other') {
		otherTitle.show();
	}
});

// create function to show design color based on design option selected
// change value shown in the select element to be the first option in the updated list
const showDesignColor = (design) => {
	$('#colors-js-puns option').eq(0).hide();
	$('#colors-js-puns option').eq(1).hide();
	$('#colors-js-puns option').eq(2).hide();
	$('#colors-js-puns option').eq(3).hide();
	$('#colors-js-puns option').eq(4).hide();
	$('#colors-js-puns option').eq(5).hide();

	if(design === 'js puns') {
		$('#colors-js-puns option').eq(0).show();
		$('#colors-js-puns option').eq(1).show();
		$('#colors-js-puns option').eq(2).show();
		$('#color').val($('#colors-js-puns option').eq(0).val())
	} else if(design === 'heart js') {
		$('#colors-js-puns option').eq(3).show();
		$('#colors-js-puns option').eq(4).show();
		$('#colors-js-puns option').eq(5).show();
		$('#color').val($('#colors-js-puns option').eq(3).val())
	} else {
		$('#colors-js-puns option').eq(0).show();
		$('#colors-js-puns option').eq(1).show();
		$('#colors-js-puns option').eq(2).show();
		$('#colors-js-puns option').eq(3).show();
		$('#colors-js-puns option').eq(4).show();
		$('#colors-js-puns option').eq(5).show();
		$('#color').val($('#colors-js-puns option').eq(0).val())
	}
};

// add event listener on the 'Design' select element
// call the showDesignColor function;
	// set the 'Color' select element to show options based on selected 	
$('#design').on('change', () => {
	let selectedDesign = $('#design option:selected').val();
	showDesignColor(selectedDesign);
});