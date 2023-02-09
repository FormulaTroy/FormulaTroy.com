<?php 
	$htmlTitle = "Start a New Game";
	include 'inc/header.php';
?>

<h2>Start a New Game</h2>
<p>Pick your team count and team names!</p>

<h4 class="greenheader">Resuming a game?</h4>

<form action="">
	<p><input type="radio" name="resume" id="resume-n" value="n" checked="checked"> <label for="resume-n">No, this is a new game.</label></p>
	<p><input type="radio" name="resume" id="resume-y" value="y"> <label for="resume-y">Yes, we are resuming a game.</label></p>
</form>
<p class="greenheader resumetext">You can input a starting score for your teams and continue where you left off.</p>

<div class="lbumper"></div>

<form action="standings.php" method="post" id="newform">

	<div class="cluster">
		<label for="numofteams">How many teams are playing?</label>
		<select name="numofteams" id="numofteams">
			<option value="2">2</option>
			<option value="3">3</option>
			<option value="4">4</option>
		</select>
	</div>

	<div id="teamoneinput" class="cluster">
		<label for="teamonename">Team 1</label>
		<input type="text" name="teamonename" id="teamonename" size="15" maxlength="15" placeholder="Team 1 Name">
		<input type="number" name="teamonestartingvalue" id="teamonestartingvalue" class="startingvalueinput" max="4995" step="5" value="0">
	</div>

	<div id="teamtwoinput" class="cluster">
		<label for="teamtwoname">Team 2</label>
		<input type="text" name="teamtwoname" id="teamtwoname" size="15" maxlength="15" placeholder="Team 2 Name">
		<input type="number" name="teamtwostartingvalue" id="teamtwostartingvalue" class="startingvalueinput" max="4995" step="5" value="0">
	</div>

	<div id="teamthreeinput" class="cluster">
		<label for="teamthreename">Team 3</label>
		<input type="text" name="teamthreename" id="teamthreename" size="15" maxlength="15" placeholder="Team 3 Name">
		<input type="number" name="teamthreestartingvalue" id="teamthreestartingvalue" class="startingvalueinput" max="4995" step="5" value="0">
	</div>

	<div id="teamfourinput" class="cluster">
		<label for="teamfourname">Team 4</label>
		<input type="text" name="teamfourname" id="teamfourname" size="15" maxlength="15" placeholder="Team 4 Name">
		<input type="number" name="teamfourstartingvalue" id="teamfourstartingvalue" class="startingvalueinput" max="4995" step="5" value="0">
	</div>

	<input type="hidden" name="comingfromform" id="comingfromform" value="1">

	<input type="submit" class="button greenbutton" value="Start Game">

</form>


<?php 
	include 'inc/footer.php';
?>