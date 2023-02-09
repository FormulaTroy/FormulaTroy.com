<?php 
	$htmlTitle = "Home";
	include 'inc/header.php';
?>

<h2>Canasta Score Keeper</h2>
<p>A web app that calculates, keeps score, and provides stats of your Canasta game!</p>

<a href="new.php" class="bigbutton greenbutton" tabindex="1">Start a New Game</a>

<div class="bumper"></div>

<h2>How It Works</h2>

<div class="col-50">
	<p class="sketch">1. Pick your teams and team names</p>
	<img src="img/preview_one.png" alt="Preview Image">
</div>
<div class="col-50">
	<p class="sketch">2. Submit card counts to the calculator</p>
	<img src="img/preview_two.png" alt="Preview Image">
</div>
<div class="clear"></div>
<div class="col-50">
	<p class="sketch">3. View the standings and round by round scores</p>
	<img src="img/preview_three.png" alt="Preview Image">
</div>
<div class="col-50">
	<p class="sketch">4. The first team to 5000 points wins</p>
	<img src="img/preview_four.png" alt="Preview Image">
</div>

<div class="clear bumper"></div>

<p class="sketch clear">No more pencils or calculators, play the easy way!</p>

<div class="bumper"></div>

<a href="new.php" class="bigbutton greenbutton" tabindex="2">Start a New Game</a>

<p>Curious how the calculator works and what rules are included in the scoring?<br><a href="about.php" class="contentlink">Take a look at the about page!</a></p>

<?php 
	include 'inc/footer.php';
?>