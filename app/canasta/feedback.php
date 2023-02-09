<?php 
	$htmlTitle = "Feedback";
	include 'inc/header.php';
?>

	<h2>Submit Feedback</h2>

	<?php 

		if ( $_SERVER['REQUEST_METHOD'] == 'POST' ) {
			
			// init post data
			$name = $_POST['name'];
			$email = $_POST['email'];
			$comments = $_POST['comments'];

			// create the email body
			$msgBody = "Canasta Scoring App Feedback\n\r";
			$msgBody .= "From: " . $name . "\n\r";
			$msgBody .= "Email: " . $email . "\n\r";
			$msgBody .= "Comments:\n\r" . $comments;

			// word-wrap the body
			$msgBody = wordwrap($msgBody,70,"\r\n");

			// send the email (to, subj, message, headers)
			mail("blutank24@msn.com", "Canasta App Feedback Form", $msgBody, "From: {$email}");

			// submitted msg
			echo "<h3 class=\"greenheader\">Thank you!</h3>";
			echo '<a href="index.php" class="bigbutton greenbutton" tabindex="1">Return to App</a>';

 		// end if-posted
		}	else { 
		// else, if not posted, display form
		// end php
		?>

	<form action="feedback.php" method="post" id="feedbackform" class="bumper">
		<p>
			<label for="name">Your Name</label><br>
			<input type="text" name="name" id="name" class="required" title="Please enter your name." placeholder="Your name here."><br>
		</p>

		<p class="bumper">
			<label for="email">Your Email</label><br>
			<input type="email" name="email" id="email" class="required" title="Please enter a return email address." placeholder="This way I can get back to you."><br>
		</p>

		<p class="bumper">
			<label for="comments">Your Feedback</label><br>
			<textarea name="comments" id="comments" cols="30" rows="7" class="required" title="Please leave some feedback." placeholder="Good or bad, please send it along!"></textarea><br>
		</p>

		<p>
			<input type="submit" value="Send Feedback" class="green button">
		</p>
	</form>

	<?php
		// resume php
		} // end if posted-else
	?>

<?php 
	include 'inc/footer.php';
?>