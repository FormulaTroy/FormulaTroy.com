<?php 
	$htmlTitle = "Results";
	include 'inc/header.php';
?>

<h2>Submit Results</h2>
<h3 class="greenheader">Round <?php echo $roundCounter; ?></h3>

<?php # handle the post

	if ($_SERVER['REQUEST_METHOD'] == 'POST') {
		
		for ($i=0; $i < $numOfTeams; $i++) { 

			// get team string based on I
			if ($i == 0) {
				$team = "one";
			} elseif ($i == 1) {
				$team = "two";
			} elseif ($i == 2) {
				$team = "three";
			} elseif ($i == 3) {
				$team = "four";
			}

			// reset round score
			$teamRoundScore = 0;

			// reset stats to add
			$teamBonusScore = 0;
			$teamPenaltyScore = 0;
			$calienteMulti = 0;


			// this team went out? give 100pts + add 1 to stats
			if ($_POST['teamoutfirst'] == $i) {
				$teamRoundScore += 100;
				$_SESSION['goneOut'][$i]++; // add 1 to goneout stats array
			}

			// canastas
			$teamRoundScore += ($_POST['team' . $team . 'wildcanasta'] * 300);
			$teamRoundScore += ($_POST['team' . $team . 'naturalcanasta'] * 500);

			print_r($teamRoundScore);echo "<br>";

			// cards played
			$teamRoundScore += ($_POST['team' . $team . 'green'] * 5);
			$teamRoundScore += ($_POST['team' . $team . 'red'] * 10);
			$teamRoundScore += ($_POST['team' . $team . 'yellow'] * 20);
			$teamRoundScore += ($_POST['team' . $team . 'black'] * 50);
			$teamRoundScore += ($_POST['team' . $team . 'bonus'] * 100);
			if ($_POST['team' . $team . 'bonus'] >= 4) {$teamRoundScore += 400;} // bonus 400pts rule
			$teamRoundScore += ($_POST['team' . $team . 'caliente'] * (-100));

			print_r($teamRoundScore);echo "<br>";

			// cards played > add bonus card + rule to bonus pts array
			$teamBonusScore += ($_POST['team' . $team . 'bonus'] * 100);			if ($_POST['team' . $team . 'bonus'] >= 4) {$teamBonusScore += 400;} // bonus 400pts rule
			$_SESSION['bonusPts'][$i] += $teamBonusScore; // to stats array

			// cards in hand
			$teamRoundScore += ($_POST['team' . $team . 'greennegative'] * (-5));
			$teamRoundScore += ($_POST['team' . $team . 'rednegative'] * (-10));
			$teamRoundScore += ($_POST['team' . $team . 'yellownegative'] * (-20));
			$teamRoundScore += ($_POST['team' . $team . 'blacknegative'] * (-50));
			if ($_POST['team' . $team . 'calientenegative'] > 0) {
				$calienteMulti = $_POST['team' . $team . 'calientenegative'] + 1;
				$teamRoundScore *= $calienteMulti;
			} // get caliente negative points multiplier

			print_r($teamRoundScore);echo "<br>";

			// cards in hand > penalty points stats to array
			$teamPenaltyScore += ($_POST['team' . $team . 'greennegative'] * (-5));
			$teamPenaltyScore += ($_POST['team' . $team . 'rednegative'] * (-10));
			$teamPenaltyScore += ($_POST['team' . $team . 'yellownegative'] * (-20));
			$teamPenaltyScore += ($_POST['team' . $team . 'blacknegative'] * (-50));
			if ($_POST['team' . $team . 'calientenegative'] > 0) {
				$calienteMulti = $_POST['team' . $team . 'calientenegative'] + 1;
				$teamPenaltyScore *= $calienteMulti;
			}
			$_SESSION['penaltyPts'][$i] += $teamPenaltyScore; // to stats array

			// add total score to roundScores multi-dem array
			$roundInArray = $roundCounter-1;
			$_SESSION['roundScores'][$roundInArray][$i] = $teamRoundScore;

			// add total score to teams total score for whole game
			$_SESSION['totalScores'][$i] += $teamRoundScore;

			print_r($teamRoundScore);echo "<br>";
			print_r($_SESSION['totalScores']);echo "<br>";

		} // end FOR num of teams

		// +1 to the round counter
		$_SESSION['roundCounter']++;

		// redirect to standings.php
		echo '<script>window.location = "standings.php"</script>';

	} // end if method=post

?>

<form action="results.php" method="post" id="resultsform">

	<fieldset>
		<p id="teamoutfirstpara">Which team went out?</p>
		<select name="teamoutfirst" id="teamoutfirst" class="required" title="Please pick a team.">
			<option value="">-- Select a Team --</option>
			<?php 
				for ($i=0; $i < $numOfTeams; $i++) {
					echo '<option value="' . $i . '">' . $teamNames[$i] . '</option>';
				}
			?>
		</select>
		<div class="lbumper"></div>
	</fieldset>
		
	<p class="lbumper">Input the card counts for each team below:</p>
	<?php # output the form

		for ($i=0; $i < $numOfTeams; $i++) { 

			echo '<div class="lbumper"></div>';

			echo '<fieldset><!--start team-->';

			echo '<p class="sketch">' . $teamNames[$i] . '</p>';

			// field outputs with the input=number functions
			// number($team, $type, $card, $value, $color);

			// get team placement string name
			if ($i == 0) {
				$team = "one";
			} elseif ($i == 1) {
				$team = "two";
			} elseif ($i == 2) {
				$team = "three";
			} elseif ($i == 3) {
				$team = "four";
			}

			echo '<div class="bumper"></div>';
			echo "<p class=\"orangeheader\">" . $teamNames[$i] . "'s Canastas</p>";

			number($team, "wildcanasta", "Wild Canasta", 300, "black");
			number($team, "naturalcanasta", "Natural Canasta", 500, "green");
			
			echo '<div class="bumper"></div>';
			echo "<p class=\"orangeheader\">" . $teamNames[$i] . "'s Cards Played</p>";

			number($team, "green", "Green <span class='little'>(4-7, Stop)</span>", 5, "green");
			number($team, "red", "Red <span class='little'>(8-K)</span>", 10, "red");
			number($team, "yellow", "Yellow <span class='little'>(Ace, Little Wild)</span>", 20, "yellow");
			number($team, "black", "Black <span class='little'>(Big Wild)</span>", 50, "black");
			number($team, "bonus", "Bonus", 100, "green");
			number($team, "caliente", "Caliente", -100, "red");

			echo '<div class="bumper"></div>';
			echo "<p class=\"orangeheader\">" . $teamNames[$i] . "'s Cards in Hand</p>";

			number($team, "greennegative", "Green <span class='little'>(4-7, Stop)</span>", -5, "green");
			number($team, "rednegative", "Red <span class='little'>(8-K)</span>", -10, "red");
			number($team, "yellownegative", "Yellow <span class='little'>(Ace, Little Wild)</span>", -20, "yellow");
			number($team, "blacknegative", "Black <span class='little'>(Big Wild)</span>", -50, "black");
			number($team, "calientenegative", "Caliente", "2x", "red");

			echo '</fieldset><!--end team-->';

		} // end for loop
	// end php
	?>

<div class="bumper clear"></div>

<p class="redheader">Please double check your card counts and values, you will <em>not</em> be able to edit this round later.</p>

<input type="submit" class="button greenbutton" value="Submit Round <?php echo $roundCounter; ?> Results">

</form><!--end results form-->

<div class="clear"></div>

<?php 
	include 'inc/footer.php';
?>