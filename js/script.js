// assign 'Other' input to a variable and hide 
const otherTitle = $('#other-title').hide();
// create variable to calculate running total cost
let total = 0;

// create running total element for 'activities' section and hide
let $total = $('<p></p>');
$('.activities').append($total);
$total.hide();

// select name text field and set focus 
$('#name').focus();

$('#payment option').eq(0).hide();
$('#payment').val('credit card');


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

// create function to check day and time of the activity
// returns a regex for the activity;
	// to be used to match the list of activities
const getRegex = (activity) => {
	// create regex to check for days and times
	const regexTues = /Tuesday/;
	const regexWed = /Wednesday/;
	const regexMorning = /9am-12pm/;
	const regexAfternoon = /1pm-4pm/;

	// check activity with each day and time available
	const tues = regexTues.test(activity);
	const wed = regexWed.test(activity);
	const morning = regexMorning.test(activity);
	const afternoon = regexAfternoon.test(activity);

	// conditional statement check if activity is on Tuesday or Wednesday
	// then checks if the activity is in the morning or afternoon
	// returns a regex based on the activity
	if(tues) {
		if(morning) {
			return /Tuesday 9am-12pm/;
		} else if(afternoon) {
			return /Tuesday 1pm-4pm/;
		}
	} else if (wed) {
		if(morning) {
			return /Wednesday 9am-12pm/;
		} else if(afternoon) {
			return /Wednesday 1pm-4pm/;
		}
	}
};

// create function to add to running total based on selected activity
const addTotal = text => {
	// conditional statement to add to total price;
		// 'Main Conference' price is $200
		// All other activity's price is $100
	if(text.includes('Main')) {
		total += 200;
	} else {
		total += 100;
	}
		return total;
};

// create function to subract from running total based on selected activity
const subtractTotal = text => {
	// conditional statement to add to total price;
		// 'Main Conference' price is $200
		// All other activity's price is $100
	if(text.includes('Main')) {
		total -= 200;
	} else {
		total -= 100;
	}
		return total;
};

// function to display running total if there is an amount to display
const displayTotal = total => {
	// display total if activity is selected
	if(total > 0) {
		$total.show();
		$total.text(`Total: $${total}`);
	} else {
		// hide total if no activity is selected
		$total.hide();
	}
};

// create function to display payment info based on selected option
const displayPaymentInfo = (element) => {
	// hide all fields in 'Payment Info' section
	$('#credit-card').hide();
	$('div p').hide();


	// show fields in 'Payment Info' section based on selected option
	if($('#payment option:selected').text() === "Credit Card" ) {
		$('#credit-card').show();
	} else if($('#payment option:selected').text() === 'PayPal') {
		$('div p').eq(1).show();
	} else if($('#payment option:selected').text() === 'Bitcoin') {
		$('div p').eq(2).show();
	} else {
		$('#credit-card').show();
		$('div p').show();
	}
};

// create functions to valid each input
const validUser = (user) => {
	// test user from input with regex;
	return /.+/.test(user);
};

const validEmail = (email) => {
	// test email from input with regex;
		// email must be in format: emailaddress@email.com
	return /\w+@\w+\.\w{3}/.test(email);
};

const registerForActivities = () => {
	// check if any activities is checked off
	if( $('.activities :checked').length > 0) {
		return true;
	} else {
		return false;
	}
};

const validCreditCardNumber = (ccNum) => {
	return /^\d{13,16}$/.test(ccNum);
};

const validCreditCardZip = (ccZip) => {
	return /^\d{5}$/.test(ccZip);
};
const validCreditCardCVV = (ccCVV) => {
	return /^\d{3}$/.test(ccCVV);
};

// add event listener on change in dropdown menu; 
	// if 'other' option is selected, show 'other title' text field
$('#title').on('change', () => {
	if($('#title option:selected').text() === 'Other') {
		otherTitle.show();
	}
});

// add event listener on the 'Design' select element
// call the showDesignColor function;
	// set the 'Color' select element to show options based on selected 	
$('#design').on('change', () => {
	let selectedDesign = $('#design option:selected').val();
	showDesignColor(selectedDesign);
});

// add event listner on activitie's checkbox
$('.activities input[type="checkbox"]').on('change', function() {
	// select activity list and assign to variable
	const activitiesList = $('.activities label');
	// select text from the checkbox's label and assign to variable
	const selectedText = $(this).parent().text();

	// check if checkbox is checked
	if($(this).is(':checked')) {
		// call function to add to total
		addTotal(selectedText);

		// create variable to call getRegex function to get regex for selected activity;
		const regexActivity = getRegex(selectedText);

		// loop through the activity list collection
		activitiesList.each(function() {
			// add disable attribute to list item that matches day and time (excluding the selected)
			if(selectedText !== $(this).text()) {
				if(regexActivity && regexActivity.test($(this).text())) {
					$(this).children().attr('disabled', true);
					$(this).css('color', 'gray');
				}
			} 
		});
	} else if(!($(this).is(':checked'))) {
		// call function to subtract from total
		subtractTotal(selectedText);

		// remove attribute from activity list if unchecked
		activitiesList.each(function() {
			$(this).children().removeAttr('disabled');
			$(this).css('color', 'black');
		});
	}
	// call function to display total (if there is amount to show)
	displayTotal(total);
});


// add event listener for selecting options in "Payment Info";
	// call displayPaymentInfo function to hide/show elements based on selection
$('#payment').on('change', () => {
	displayPaymentInfo();
});

// add event listener to 'Register' button;
	// prevent button from submitting if fields are not validated
	// highlight fields red if not validated
$('button').on('click', function(event) {
	const userName = $('#name').val();
	if(!validUser(userName)) {
		event.preventDefault();
		$('#name').css('border', '2px solid red');
	}

	const email = $('#mail').val();
	if(!validEmail(email)) {
		event.preventDefault();
		$('#mail').css('border', '2px solid red');
	}

	if(!registerForActivities()) {
		event.preventDefault();
		$('.activities legend').css('color', 'red');
	} else {
		$('.activities legend').removeAttr('style');
	}

	const ccNum = $('#cc-num').val();
	if($('#payment option:selected').text() === "Credit Card") {
		if(!validCreditCardNumber(ccNum)) {
			event.preventDefault();
			$('#cc-num').css('border', '2px solid red');
		}

		const ccZip = $('#zip').val();
		if(!validCreditCardZip(ccZip)) {
			event.preventDefault();
			$('#zip').css('border', '2px solid red');
		}

		const ccCVV = $('#cvv').val();
		if(!validCreditCardCVV(ccCVV)) {
			event.preventDefault();
			$('#cvv').css('border', '2px solid red');
		}
	}
});

// add event listener to validation fields;
	// highlight red if not validated; remove highlight if validated
$('#name').on('keyup', function() {
	const userName = $(this).val();
	const valid = validUser(userName);
	if(valid) {
		$(this).removeAttr('style');
	} 
});

$('#mail').on('keyup', function() {
	const email = $(this).val();
	const valid = validEmail(email);

	if(valid) {
		$(this).removeAttr('style');
	} else {
		$(this).css('border', '2px solid red');
	}
});

$('#cc-num').on('keyup', function() {
	const ccNum = $(this).val();
	const valid = validCreditCardNumber(ccNum);
	if(valid) {
		$(this).removeAttr('style');
	} else {
		$(this).css('border', '2px solid red');
	}
});

$('#zip').on('keyup', function() {
	const ccZip = $(this).val();
	const valid = validCreditCardZip(ccZip);
	if(valid) {
		$(this).removeAttr('style');
	} else {
		$(this).css('border', '2px solid red')
	}
});

$('#cvv').on('keyup', function() {
	const ccCVV = $(this).val();
	const valid = validCreditCardCVV(ccCVV);
	if(valid) {
		$(this).removeAttr('style');
	} else {
		$(this).css('border', '2px solid red')
	}
});

// call function to display payment info when script loads
displayPaymentInfo();