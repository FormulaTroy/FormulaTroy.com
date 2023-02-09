<?php 
	$htmlTitle = "Standings";
	include 'inc/header.php';
?>

<?php

	if ($gameOver == 0) {
		echo "<h2>Game Standings</h2>";
	} else {
		echo "<h2>We Have a Winner!</h2>";
	}
?>
<div class="bumper"></div>

<?php #print_r test section

	//echo '$_SESSION["gameStarted"] ';print_r($_SESSION['gameStarted']); echo "<br>";

		/*echo "numOfTeams ";print_r($numOfTeams); echo "<br>";
		echo "teamNames ";print_r($teamNames); echo "<br>";
		echo "totalScores ";print_r($totalScores); echo "<br>";
		echo "roundCounter ";print_r($roundCounter); echo "<br>";
		echo "roundScores ";print_r($roundScores); echo "<br>";
		echo "goneOut ";print_r($goneOut); echo "<br>";
		echo "bonusPts ";print_r($bonusPts); echo "<br>";
		echo "penaltyPts ";print_r($penaltyPts); echo "<br>";
		echo "gameOver ";print_r($gameOver); echo "<br>";
		echo "highScore ";print_r($highScore); echo "<br>";*/
?>

<?php # game over & final results section

	// game results

	if ($gameOver == 1) {

		// assign stat values to an external var
		$teamOneTotalScore = $totalScores[0];
		$teamTwoTotalScore = $totalScores[1];
		if ($numOfTeams >= 3) {
			$teamThreeTotalScore = $totalScores[2];
		}
		if ($numOfTeams == 4) {
			$teamFourTotalScore = $totalScores[3];
		}

		// uncheck all teams, other wise if 2 values in array are even will only display first instance twice.
		$teamOneChecked = 0;
		$teamTwoChecked = 0;
		$teamThreeChecked = 0;
		$teamFourChecked = 0;

		// sort array highest to lowest
		rsort($totalScores);

		for ($i=0; $i < $numOfTeams; $i++) { 

			// get value to compare to external vars
			$compareVal = $totalScores[$i];

			// compare current value to external vars to determine which team it is from
			if ($compareVal == $teamOneTotalScore && $teamOneChecked == 0) {
				$teamToDisplay = $teamNames[0];
				$teamOneChecked = 1;
			} elseif ($compareVal == $teamTwoTotalScore && $teamTwoChecked == 0) {
				$teamToDisplay = $teamNames[1];
				$teamTwoChecked = 1;
			} elseif ($compareVal == $teamThreeTotalScore && $teamThreeChecked == 0 && $numOfTeams > 2) {
				$teamToDisplay = $teamNames[2];
				$teamThreeChecked = 1;
			} elseif ($compareVal == $teamFourTotalScore && $teamFourChecked == 0 && $numOfTeams > 3) {
				$teamToDisplay = $teamNames[3];
				$teamFourChecked = 1;
			}

			// start output display
			echo '<p class="sketch results-section">' . "\n";

			// display trophy and place
			switch ($i) {
				case '0':
					echo '<img src="img/ico/trophy_gold.png" alt="">' . "\n";
					echo '<span class="results-place">1st.</span>' . "\n";
					break;
				case '1':
					echo '<img src="img/ico/trophy_silver.png" alt="">' . "\n";
					echo '<span class="results-place">2nd.</span>' . "\n";
					break;
				case '2':
					echo '<img src="img/ico/trophy_bronze.png" alt="">' . "\n";
					echo '<span class="results-place">3rd.</span>' . "\n";
					break;
				case '3':
					echo '' . "\n";
					echo '<span class="results-place">4th.</span>' . "\n";
					break;			
				default:
					break;
			} // end switch trophy and place

			// display name
			if ($i == 0) {
				echo '<span class="results-first">' . $teamToDisplay . '</span>' . "\n";
			} else {
				echo '<span class="results-name">' . $teamToDisplay . '</span>' . "\n";
			}

			// display points
			echo '<span class="results-points">' . $compareVal . 'pts</span>' . "\n";

			// end display output
			echo '</p>' . "\n"; 

		} // end for loop
	} //end if gameover
	#end php
?>

<?php #example results output
/*	<p class="sketch results-section">
		<img src="img/ico/trophy_gold.png" alt=""> <span class="results-place">1st.</span>
		<span class="results-first">Team Falcon</span>
		<span class="results-points">5200pts</span>
	</p>

	<p class="sketch results-section">
		<img src="img/ico/trophy_silver.png" alt=""> <span class="results-place">2nd.</span>
		<span class="results-name">Team 2</span>
		<span class="results-points">4800pts</span>
	</p>

	<p class="sketch results-section">
		<img src="img/ico/trophy_bronze.png" alt=""> <span class="results-place">3rd.</span>
		<span class="results-name">Bubble Squad</span>
		<span class="results-points">3200pts</span>
	</p>

	<p class="sketch results-section">
		<span class="results-place">4th.</span>
		<span class="results-name">Rawrzors</span>
		<span class="results-points">1755pts</span>
	</p>*/
?>

<?php # overall standings

	// teams overall progress bars

	if ($gameOver == 0) {

		// assign stat values to an external var
		$teamOneTotalScore = $totalScores[0];
		$teamTwoTotalScore = $totalScores[1];
		if ($numOfTeams >= 3) {
			$teamThreeTotalScore = $totalScores[2];
		}
		if ($numOfTeams == 4) {
			$teamFourTotalScore = $totalScores[3];
		}

		// uncheck all teams, other wise if 2 values in array are even will only display first instance twice.
		$teamOneChecked = 0;
		$teamTwoChecked = 0;
		$teamThreeChecked = 0;
		$teamFourChecked = 0;

		// sort array highest to lowest
		rsort($totalScores);

		for ($i=0; $i < $numOfTeams; $i++) { 

			// get value to compare to external vars
			$compareVal = $totalScores[$i];

			// compare current value to external vars to determine which team it is from
			if ($compareVal == $teamOneTotalScore && $teamOneChecked == 0) {
				$teamToDisplay = $teamNames[0];
				$teamOneChecked = 1;
			} elseif ($compareVal == $teamTwoTotalScore && $teamTwoChecked == 0) {
				$teamToDisplay = $teamNames[1];
				$teamTwoChecked = 1;
			} elseif ($compareVal == $teamThreeTotalScore && $teamThreeChecked == 0 && $numOfTeams > 2) {
				$teamToDisplay = $teamNames[2];
				$teamThreeChecked = 1;
			} elseif ($compareVal == $teamFourTotalScore && $teamFourChecked == 0 && $numOfTeams > 3) {
				$teamToDisplay = $teamNames[3];
				$teamFourChecked = 1;
			}

			// display the team overall scorebox
			echo '<div class="teamoverallscorebox clear">' . "\n"; 										// start score box
			echo '<p class="teamname sketch">' . $teamToDisplay . '</p>' . "\n"; 			// team name
			echo '<div class="progressbarback">' . "\n"; 															// progress bar container
			echo '<p class="sketch">' . $compareVal . 'pts</p>' . "\n";								// current points

			//get to-5000 % for the front progress bar
			$compareRatio = ($compareVal / 5000) * 100;

			// make sure it is not under 0 or above 5000 so the div width % isnt glitched
			if ($compareRatio >= 100) {
				$compareRatio = 100;
			} elseif ($compareRatio <= 0) {
				$compareRatio = 0;
			}

			// find progress bar color class based on ratio
			$colorClass = "red";

			if ($compareRatio > 33) {
				$colorClass = "yellow";
			}

			if ($compareRatio > 66) {
				$colorClass = "green";
			}

			// echo progress bar front
			echo '<div class="progressbarfront ' . $colorClass . '" style="width:' . $compareRatio . '%;"></div><!--end progress bar front-->' . "\n";

			echo '</div><!--end progress bar back-->' . "\n";
			echo '</div><!--end overallscorebox-->' . "\n";


		} // end for loop
} //end if gameover

// end php
?>

<?php #sample output

	/*<!-- EXAMPLE OUTPUT
	<div class="teamoverallscorebox clear">
		<p class="teamname sketch">Test Name</p>
		<div class="progressbarback">
			<p class="sketch">1500pts</p>
			<div class="progressbarfront yellow" style="width:40%;"></div>
		</div>
	</div>
	-->*/
?>

<div class="clear bumper"></div>
<?php if ($gameOver == 0) { ?>
	<a href="results.php" class="button greenbutton" tabindex="1">Submit Results</a>
<?php } ?>
<div class="bumper"></div>

<h3>Game Stats</h3>

<?php if ($roundCounter > 1) {  //end php ?>
<div><!--stats container-->
	<div class="col-33">

		<h4 class="greenheader">Gone Out</h4>

		<?php

		// assign stat values to an external var
		$teamOneGoOut = $goneOut[0];
		$teamTwoGoOut = $goneOut[1];
		$teamThreeGoOut = -10;
		$teamFourGoOut = -10;
		if ($numOfTeams >= 3) {
			$teamThreeGoOut = $goneOut[2];
		}
		if ($numOfTeams == 4) {
			$teamFourGoOut = $goneOut[3];
		}
		
		// uncheck all teams, other wise if 2 values in array are even will only display first instance twice.
		$teamOneChecked = 0;
		$teamTwoChecked = 0;
		$teamThreeChecked = 0;
		$teamFourChecked = 0;

		// sort array highest to lowest
		rsort($goneOut);

		for ($i=0; $i < $numOfTeams; $i++) { 

			echo "<p>" . "\n";

			// get value to compare to external vars
			$compareVal = $goneOut[$i];

			// compare current value to external vars to determine which team it is from
			if ($compareVal == $teamOneGoOut && $teamOneChecked == 0) {
				$teamToDisplay = $teamNames[0];
				$teamOneChecked = 1;
			} elseif ($compareVal == $teamTwoGoOut && $teamTwoChecked == 0) {
				$teamToDisplay = $teamNames[1];
				$teamTwoChecked = 1;
			} elseif ($compareVal == $teamThreeGoOut && $teamThreeChecked == 0 && $numOfTeams > 2) {
				$teamToDisplay = $teamNames[2];
				$teamThreeChecked = 1;
			} elseif ($compareVal == $teamFourGoOut && $teamFourChecked == 0 && $numOfTeams > 3) {
				$teamToDisplay = $teamNames[3];
				$teamFourChecked = 1;
			}
			
			// display the "Team - Val" statement
			echo $teamToDisplay . " (" . $compareVal . ")</p>" . "\n";

		} // end for loop

		// end php
		?>
	</div>
	<div class="col-33">

		<h4 class="greenheader">Bonus Pts</h4>

		<?php

		// assign stat values to an external var
		$teamOneBonusPts = $bonusPts[0];
		$teamTwoBonusPts = $bonusPts[1];
		$teamThreeBonusPts = -10;
		$teamFourBonusPts = -10;
		if ($numOfTeams >= 3) {
			$teamThreeBonusPts = $bonusPts[2];
		}
		if ($numOfTeams == 4) {
			$teamFourBonusPts = $bonusPts[3];
		}

		// uncheck all teams, other wise if 2 values in array are even will only display first instance twice.
		$teamOneChecked = 0;
		$teamTwoChecked = 0;
		$teamThreeChecked = 0;
		$teamFourChecked = 0;

		// sort array highest to lowest
		rsort($bonusPts);

		for ($i=0; $i < $numOfTeams; $i++) { 

			echo "<p>" . "\n";

			// get value to compare to external vars
			$compareVal = $bonusPts[$i];

			// compare current value to external vars to determine which team it is from
			if ($compareVal == $teamOneBonusPts && $teamOneChecked == 0) {
				$teamToDisplay = $teamNames[0];
				$teamOneChecked = 1;
			} elseif ($compareVal == $teamTwoBonusPts && $teamTwoChecked == 0) {
				$teamToDisplay = $teamNames[1];
				$teamTwoChecked = 1;
			} elseif ($compareVal == $teamThreeBonusPts && $teamThreeChecked == 0 && $numOfTeams > 2) {
				$teamToDisplay = $teamNames[2];
				$teamThreeChecked = 1;
			} elseif ($compareVal == $teamFourBonusPts && $teamFourChecked == 0 && $numOfTeams > 3) {
				$teamToDisplay = $teamNames[3];
				$teamFourChecked = 1;
			}
			
			// display the "Team - Val" statement
			echo $teamToDisplay . " (" . $compareVal . "pts)</p>" . "\n";

		} // end for loop
		
		// end php
		?>

	</div>
	<div class="col-33">
		<h4 class="redheader">Penalty Pts</h4>

		<?php

		// assign stat values to an external var
		$teamOnePenaltyPts = $penaltyPts[0];
		$teamTwoPenaltyPts = $penaltyPts[1];
		$teamThreePenaltyPts = 10;
		$teamFourPenaltyPts = 10;
		if ($numOfTeams >= 3) {
			$teamThreePenaltyPts = $penaltyPts[2];
		}
		if ($numOfTeams == 4) {
			$teamFourPenaltyPts = $penaltyPts[3];
		}
		
		// uncheck all teams, other wise if 2 values in array are even will only display first instance twice.
		$teamOneChecked = 0;
		$teamTwoChecked = 0;
		$teamThreeChecked = 0;
		$teamFourChecked = 0;

		// (this one is lowest to highest, so the lowest negative will be first)
		sort($penaltyPts);

		for ($i=0; $i < $numOfTeams; $i++) { 

			echo "<p>" . "\n";

			// get value to compare to external vars
			$compareVal = $penaltyPts[$i];

			// compare current value to external vars to determine which team it is from
			if ($compareVal == $teamOnePenaltyPts && $teamOneChecked == 0) {
				$teamToDisplay = $teamNames[0];
				$teamOneChecked = 1;
			} elseif ($compareVal == $teamTwoPenaltyPts && $teamTwoChecked == 0) {
				$teamToDisplay = $teamNames[1];
				$teamTwoChecked = 1;
			} elseif ($compareVal == $teamThreePenaltyPts && $teamThreeChecked == 0 && $numOfTeams > 2) {
				$teamToDisplay = $teamNames[2];
				$teamThreeChecked = 1;
			} elseif ($compareVal == $teamFourPenaltyPts && $teamFourChecked == 0 && $numOfTeams > 3) {
				$teamToDisplay = $teamNames[3];
				$teamFourChecked = 1;
			}
			
			// display the "Team - Val" statement
			echo $teamToDisplay . " (" . $compareVal . "pts)</p>" . "\n";

		} // end for loop
		
		// end php
		?>
	</div>
</div><!--stats container-->
<?php
// end if roundCounter
} else {
	echo "<p>Finish at least one round to view game stats!</p>" . "\n";
}//end php ?>

<div class="bumper clear"></div>
<h3 class="clear">Round by Round Scores</h3>

<?php if ($roundCounter > 1) {  //end php ?>
<div><!--round by round container-->

	<?php

		// reverse the top-level elements in roundScores, 'true' means maintain key-value so the 2nd level arrays are not reversed as well! This just reverses the arrays for each round; $roundScores[i]; $roundScores[i][x] is untouched
		$roundScores = array_reverse($roundScores, true);

		$roundCounterTemp = $roundCounter; //need? maybe to reverse the count order

		// start loop of rounds, $roundCounter[round]          DO NOT use $i < 0, is not a valid bool!
		for ($i = $roundCounter - 2; $i >= 0; $i--) { 

			// start echoing html elements for round
			echo '<div class="col-50">' . "\n";
			echo '<div class="roundscorebox clear">' . "\n";
			echo '<h4 class="roundcounter greenheader">Round ' . ($i+1) . '</h4>' . "\n";

			//find highest value based on the 4 scores in the round
			$highestValue = max($roundScores[$i]);

			// start loop of teams within loop of rounds, $roundCounter[round][teamscore]
			for ($subi=0; $subi < $numOfTeams; $subi++) { 

				// echo innter html elements for each team
				echo '<p class="teamname sketch">' . $teamNames[$subi] . '</p>' . "\n";
				echo '<div class="roundbarback">' . "\n";

				// compare highest value, put into condition to prevent diving by 0!
				if ($highestValue > 0) {
					//get to-highest % for the front progress bar
					$compareRatio = ($roundScores[$i][$subi] / $highestValue) * 100;

					// make sure it is not under 0 or above the highest so the div width % isnt glitched
					if ($compareRatio >= 100) {$compareRatio = 100;} elseif ($compareRatio <= 0) {$compareRatio = 0;}

					// find progress bar color class based on ratio
					$colorClass = "red";
					if ($compareRatio > 33) {$colorClass = "yellow";}
					if ($compareRatio > 66) {$colorClass = "green";}
				}


				// echo score
				echo '<p class="sketch">' . $roundScores[$i][$subi] . 'pts</p>' . "\n";

				// echo dynamic progress bar and end the team html
				echo '<div class="roundbarfront ' . $colorClass . '" style="width:' . $compareRatio . '%;"></div>' . "\n";
				echo '</div><!--end round bar back-->' . "\n";

			} // end inner for loop

			// echo final html for round
			echo '</div><!--end round score box-->' . "\n";
			echo '</div><!--end col-->' . "\n";
			
		} // end round for loop

	// end PHP
	?>

<?php # sample output
	/*	<!-- 	<div class="col-50">
		<div class="roundscorebox clear">
			<p class="roundcounter">Round 2</p>
			<p class="teamname sketch">MMMMMMMMMMMMMMM</p>
			<div class="roundbarback">
				<p class="sketch">1500pts</p>
				<div class="roundbarfront yellow" style="width:40%;"></div>
			</div>
		</div>
	</div> -->

	<!-- SAMPLE OUTPUT
		<div class="col-50">
			<p class="roundcounter">Round 1</p>
			<div class="roundscorebox clear">
				<p class="teamname sketch">MMMMMMMMMMMMMMM</p>
				<div class="roundbarback">
					<p class="sketch">1500pts</p>
					<div class="roundbarfront green" style="width:90%;"></div>
				</div>
				<p class="teamname sketch">AAAAAAAAAAAAAAA</p>
				<div class="roundbarback">
					<p class="sketch">1500pts</p>
					<div class="roundbarfront green" style="width:90%;"></div>
				</div>
				<p class="teamname sketch">Team Falcon</p>
				<div class="roundbarback">
					<p class="sketch">1500pts</p>
					<div class="roundbarfront green" style="width:90%;"></div>
				</div>
				<p class="teamname sketch">Test Name</p>
				<div class="roundbarback">
					<p class="sketch">1500pts</p>
					<div class="roundbarfront green" style="width:90%;"></div>
				</div>
			</div>
		</div>
	-->*/
?>

</div><!--round by round container-->
<?php
// end if roundCounter
} else {
	echo "<p>Finish at least one round to view round scores!</p>" . "\n";
} //end php ?>

<div class="bumper clear"></div>
<?php if ($gameOver == 0) { ?>
	<a href="results.php" class="button greenbutton" tabindex="1">Submit Results</a>
<?php } ?>

<?php 
	include 'inc/footer.php';
?>