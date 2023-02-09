<?php 

// results form functions

function number($team, $type, $card, $value, $color) {

	$fieldname = "team" . $team . $type;

	echo '<div class="inputcontainer clear">' . "\n";
	echo '<div class="display ' . $color . '">' . $value . '</div>' . "\n";
	echo '<label for="' . $fieldname . '">' . $card . '</label>' . "\n";
	echo '<input type="number" name="' . $fieldname . '" id="' . $fieldname . '" min="0" value="" placeholder="0" step="1">' . "\n";
	echo '<div class="clear"></div>' . "\n";
	echo '</div><!--end inputcontainer-->' . "\n";

}

/*
	<div class="inputcontainer clear">
		<div class="display red">500</div>
		<label for="">Natural Canasta</label>
		<input type="number" name="" id="" min="0" value="0" step="1">
		<div class="clear"></div>
	</div>
*/

// sketch font para
function sketch($inputText) {
	echo '<p class="sketch">' + $inputText + '</p>';
}

// end PHP
?>