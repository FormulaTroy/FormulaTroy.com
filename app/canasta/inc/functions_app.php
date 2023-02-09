<?php

////// Page Functions
//// All Pages, init game state for redirects
if ( isset($_SESSION['gameStarted']) /*|| $_SESSION['gameStarted'] == 1 */) {
	// nothing
} elseif (  !isset($_SESSION['gameStarted']) /*|| !isset($_POST['comingfromform'])*/ ) {
	$_SESSION['gameStarted'] = 0;
	$_SESSION['gameOver'] = 1;
}

//// Home and New page redirects
if ($htmlTitle == "Home" || $htmlTitle == "Start a New Game") {
	// redirect to standings if game started
	if ( isset($_SESSION['gameStarted']) ) {
		if ( $_SESSION['gameStarted'] == 1 ) {echo '<script>window.location = "standings.php"</script>';}
	}
}
// end home and new

//// Results Page Redirects
if ($htmlTitle == "Results") {

	// redirect to new if game hasnt started
	if (  !isset($_SESSION['gameStarted']) || $_SESSION['gameStarted'] != 1) {
		echo '<script>window.location = "new.php"</script>';
	}

	// redirect to standings if game over
	if ($_SESSION['gameOver'] != 0) {
		echo '<script>window.location = "standings.php"</script>';
	}
}
// End results page

//// Standings Page

if ($htmlTitle == "Standings") {

	// standings redirects
	if ($_SESSION['gameStarted'] == 1) {
		//nothing
	// if game isnt started or not coming from form, redirect to new
	} elseif (  !isset($_SESSION['gameStarted']) || !isset($_POST['comingfromform']) ) {
		echo '<script>window.location = "new.php"</script>';
	}

	// New Game Form Handler
	if ($_SESSION['gameStarted'] != 1 && $_POST['comingfromform'] == 1) {
//if (!isset($_SESSION['gameStarted']) || $_SESSION['gameStarted'] != 1 && $_POST['comingfromform'] == 1) {

		// Handle the new game form

		//numOfTeams
		$numOfTeams = $_POST['numofteams'];
		$_SESSION['numOfTeams'] = $numOfTeams;

		//// uber switch values and array lengths based on number of teams
		// names; check if values were added and assigned, if not assign generic name
		if (empty($_POST['teamonename'])) {$teamonename = "Team 1";} else {$teamonename = $_POST['teamonename'];}
		if (empty($_POST['teamtwoname'])) {$teamtwoname = "Team 2";} else {$teamtwoname = $_POST['teamtwoname'];}
		if (empty($_POST['teamthreename'])) {$teamthreename = "Team 3";} else {$teamthreename = $_POST['teamthreename'];}
		if (empty($_POST['teamfourname'])) {$teamfourname = "Team 4";} else {$teamfourname = $_POST['teamfourname'];}

		// if starting values were null from blank input field, reset to 0
		if ($_POST['teamonestartingvalue'] == "") {$_POST['teamonestartingvalue'] = 0;}
		if ($_POST['teamtwostartingvalue'] == "") {$_POST['teamtwostartingvalue'] = 0;}
		if ($_POST['teamthreestartingvalue'] == "") {$_POST['teamthreestartingvalue'] = 0;}
		if ($_POST['teamfourstartingvalue'] == "") {$_POST['teamfourartingvalue'] = 0;}

		// uber switch statement to determine array sizes based on number of teams
		switch ($numOfTeams) {

			case 2:
				$teamNames = [$teamonename,$teamtwoname];
				$totalScores = [$_POST['teamonestartingvalue'],$_POST['teamtwostartingvalue']];
				$goneOut = [0,0];
				$bonusPts = [0,0];
				$penaltyPts = [0,0];
				break;

			case 3:
				$teamNames = [$teamonename,$teamtwoname,$teamthreename];
				$totalScores = [$_POST['teamonestartingvalue'],$_POST['teamtwostartingvalue'],$_POST['teamthreestartingvalue']];
				$goneOut = [0,0,0];
				$bonusPts = [0,0,0];
				$penaltyPts = [0,0,0];
				break;

			case 4:
				$teamNames = [$teamonename,$teamtwoname,$teamthreename,$teamfourname];
				$totalScores = [$_POST['teamonestartingvalue'],$_POST['teamtwostartingvalue'],$_POST['teamthreestartingvalue'],$_POST['teamfourstartingvalue']];
				$goneOut = [0,0,0,0];
				$bonusPts = [0,0,0,0];
				$penaltyPts = [0,0,0,0];
				break;
				
			default:
				break;
		}
		
		// set all uber-case statement vars to session
		$_SESSION['teamNames'] = $teamNames;
		$_SESSION['totalScores'] = $totalScores;
		$_SESSION['goneOut'] = $goneOut;
		$_SESSION['bonusPts'] = $bonusPts;
		$_SESSION['penaltyPts'] = $penaltyPts;

		// gameStarted
		$_SESSION['gameStarted'] = 1;

		// gameOver
		$gameOver = 0;
		$_SESSION['gameOver'] = 0;

		//round counter
		$roundCounter = 1;
		$_SESSION['roundCounter'] = $roundCounter;

		//round scores
		$roundScores = [];
		$_SESSION['roundScores'] = $roundScores;

		$highScore = max($totalScores);

		// end if game isn't started

	} else {

		// if the game is started, returning to the standings page
		// assign all the session vars to local vars

		$numOfTeams 		= $_SESSION['numOfTeams'];
		$teamNames 			= $_SESSION['teamNames'];
		$totalScores 		= $_SESSION['totalScores'];
		$roundCounter 	= $_SESSION['roundCounter'];
		$roundScores 		= $_SESSION['roundScores'];
		$goneOut 				= $_SESSION['goneOut'];
		$bonusPts 			= $_SESSION['bonusPts'];
		$penaltyPts 		= $_SESSION['penaltyPts'];
		$gameStarted 		= $_SESSION['gameStarted'];

		// is the game over?
		$highScore = max($totalScores);
		if ($highScore >= 5000) {
			$_SESSION['gameOver'] = 1;
		}
		$gameOver 			= $_SESSION['gameOver'];

	} // end if the game is started, returning to the standings page

} //// end standings page

//// Results Page

if ($htmlTitle == "Results") {

	$numOfTeams 		= $_SESSION['numOfTeams'];
	$teamNames 			= $_SESSION['teamNames'];
	$totalScores 		= $_SESSION['totalScores'];
	$roundCounter 	= $_SESSION['roundCounter'];
	$roundScores 		= $_SESSION['roundScores'];
	$goneOut 				= $_SESSION['goneOut'];
	$bonusPts 			= $_SESSION['bonusPts'];
	$penaltyPts 		= $_SESSION['penaltyPts'];

} // end if results page
//// End Results Page

////// Nav Functions
//// App Nav
function appNav() {
//end PHP ?>
<div id="appnav">
<?php
	$gameOver = $_SESSION['gameOver'];
	if ($gameOver == 0) { ?>
		<a href="results.php"><img src="img/ico/results.png" alt=""> <span class="showmedinline">Submit</span> Results</a>
	<?php }
?>
<a href="standings.php"><img src="img/ico/standings.png" alt=""> <span class="showmedinline">View</span> Standings</a>
<a href="end.php" class="newgamelink"><img src="img/ico/new.png" alt=""> New <span class="showmedinline">Game</span></a>
</div>
<div class="lbumper clear"></div>
<?php // resume php
} // end appNav()

//// End Game Page
if ($htmlTitle == "End Game") {
	$_SESSION = [];
	session_destroy();
	$_SESSION['gameOver'] = 1;
	$_SESSION['gameStarted'] = 0;
	echo '<script>window.location = "new.php"</script>';
} //// End End Game Page

//end PHP
?>