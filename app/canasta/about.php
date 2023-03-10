<?php 
	$htmlTitle = "About";
	include 'inc/header.php';
?>

<h2>About the Canasta App</h2>

<div class="about" id="top">

	<h3 class="greenheader bumper">Table of Contents</h3>

	<ol>
		<li><a href="#playing" class="contentlink">Playing a Full Game</a></li>
		<li><a href="#howitworks" class="contentlink">How the App Works</a></li>
		<li><a href="#rules" class="contentlink">Calculated Rules</a></li>
		<li><a href="#variations" class="contentlink">Game Variations</a></li>
		<li><a href="#credits" class="contentlink">Credits</a></li>
	</ol>

	<h3 id="playing" class="greenheader lbumper">Playing a Full Game</h3>

	<h4 class="bumper">Starting a New Game</h4>
	<p>Games are started on the <a href="new.php" class="contentlink">new game page</a> by selecting the number of teams and then inputting team names for each. If a team name is not entered generic names like "Team 1" will be used. The new game page is found by clicking the "Start a New Game" button on the <a href="index.php" class="contentlink">home page</a>.</p>
	<p>When you submit the new game form you will be directed to the standings page, and will see any initial point values immediately if you are <a href="#resuming" class="contentlink">resuming a game</a>.</p>
	<p>Note: If you are playing with just two or three people and do not have "teams" you can enter each player's name instead of a team name.</p>

	<h4 class="bumper" id="resuming">Resuming a Game</h4>

	<p>On the <a href="new.php" class="contentlink">new game page</a>, hit the radio button that says "we are resuming a game". This will add number input fields next to the team names in the form below. These number fields are used for assigning a starting value for each team, which is usually the amount of points each team had when you stopped playing the game you are now resuming.</p>
	<p>Note: Starting values must be divisible by five and cannot be over 4995. They <em>can</em> be negative, special rules with negative total points are accounted for in the scoring system.</p>	

	<h4 class="bumper">Playing Through the Rounds</h4>

	<p>After the game state in the app begins you will be directed to the <em>standings</em> page. You will see all of the teams listed with progress bars to 5000pts, and if you are resuming a game the starting values will already be applied to the teams.</p>
	<p>The next step is to physically play out the round.</p>
	<p>When the round is completed click the green "submit round results" button. You will be taken to the <em>results</em> page. First select which team "went out" to end the round. Then proceed team by team inputting the <em>number</em> of canastas, cards played, and cards still in hand.</p>
	<p>Each team should group all of their 5pt, 10pt, 20pt, and 50pt cards together as all that is needed is the <em>number of cards</em> for each point value, <em>not</em> the total point value! If you played Five 20pt cards you would input "5" into the "20pt Yellow" cards played counter, not 100. All you're doing here is counting the amounts of cards, not the points they add up to. No math needed!</p>

	<h4 class="bumper">Ending a Game</h4>

	<p>The game ends when a team reaches 5000pts.</p>
	<p>At this point the standings page will display the teams with their points and trophies!</p>

	<h4 class="bumper">Starting a New Game After a Game Has Begun</h4>

	<p>If the game state is initiated (at any stage) but you want to start a new game, press the "New Game" button in the top right of any page in the app navigation area. You will be asked to confirm your choice (to prevent accidentally losing a game state on one click), and then take to the new game page.</p>
	<p>This web app uses <em>browser sessions</em> to store data, not cookies. Sessions are stored on the server and related to the web browser's use-instance. The session data remains on the server until the use-instance is destroyed (by closing your browser).</p>
	<p>The web app <em>does not use cookies</em>. Cookies are temporary files stored in the browsers cache.</p>

	<p class="bumper"><a href="#top" class="contentlink toplink">Back to Table of Contents</a></p>

	<h3 id="howitworks" class="greenheader lbumper">How the App Works</h3>

	<h4 class="bumper">Game Standings</h4>
	<p>The game standings display each teams overall progress to 5000pts. The display is sorted by most points. Every third of the journey the display bar changes color (red, yellow, then green) as the team gets closer to 5000.</p>

	<h4 class="bumper">Bonus Points Stats</h4>
	<p>Bonus point stats are the total number bonus points generated by collecting bonus cards. This also includes points collected from the <a href="#bonusmulti" class="contentlink">bonus multiplier</a>. They are sorted highest to lowest in the stat display. Points gained by being the team to end the round by going out are not counted as bonus points.</p>

	<h4 class="bumper" id="penaltypts">Penalty Points Stats</h4>
	<p>Penalty point stats are the total number of points lost due to having cards in-hand when the round ends. This value includes the multipliers applied per-round by the <a href="#calientemulti" class="contentlink">caliente multiplier</a>.</p>
	<p>Note: Calientes played during the round are not counted as penalty points.</p>

	<h4 class="bumper">Gone Out Stats</h4>
	<p>Gone out stats are the total number of times a team went out (was the team to end a round). They are sorted highest to lowest in the stat display.</p>

	<h4 class="bumper">Round by Round Scores</h4>
	<p>The round by round scores show each team's net points earned for each round. Unlike the standings, they are not sorted. This is to make it easier to compare teams across rounds.</p>
	<p>The display bar colors work differently for round scores as well. While the overall standings bars change colors relative to 5000pts, round score display bars are relative to the team with the most amount of points for that round.</p>

	<p class="bumper"><a href="#top" class="contentlink toplink">Back to Table of Contents</a></p>

	<h3 id="rules" class="greenheader lbumper">Calculated Rules</h3>

	<h4>Card Values</h4>
	<p>
		5pts - Green Cards / 4, 5, 6, 7, Stop (Black 3)<br>
		10pts - Red Cards / 8, 9, 10, Jack, Queen, King<br>
		20pts - Yellow Cards / Ace, Little Wild (2)<br>
		50pts - Black Cards / Big Wild (Joker)<br>
		100pts - <a href="#bonusmulti" class="contentlink">Bonus Cards</a> / Bonus (Red 3)<br>
		-100pts - <a href="#calientemulti" class="contentlink">Caliente</a>
	</p>

	<h4 class="bumper">Team Scoring</h4>
	<p>Teams (regardless of player count) are scored as single entities. This means that all cards played, cards in hand (<a href="#penaltypts" class="contentlink">penalty points</a>), <a href="#bonusmulti" class="contentlink">bonus multipliers</a>, and <a href="#calientemulti" class="contentlink">caliente multipliers</a> for all of the team's players (one or more) are totaled during scoring and reported as single units.</p>

	<h4 class="bumper" id="bonusmulti">Bonus Card Multiplier</h4>
	<p>Playing a bonus card earns your team 100pts bonus points. However if your team plays all four bonus cards (400pts), an additional 400pts is added to the team's bonus point score (totaling 800pts for four bonus cards).</p>
	<p>If there are more than four bonus cards in the deck and a team ends up playing more than four, an additional 100pts is added for every extra bonus card but there are no more additional multipliers. For instance, playing six bonus cards is 1000pts (six times 100pts, plus 400pts for playing at least four).</p>
	<p>Note: With a standard deck of cards the bonus cards are the red threes.</p>

	<h4 class="bumper" id="calientemulti">Caliente Card Multiplier</h4>
	<p>Playing a caliente card loses your team 100pts during regular play. However at the end of the round if your team has a caliente still in-hand, it doubles the point value of all of the <a href="#penaltypts" class="contentlink">penalty points</a> the team takes that round. Any additional caliente cards a team holds increase the multiplier ratio by one each. For instance three caliente cards left in hand will equate to the number penalty points for the team multiplied by four.</p>
	<p>If the only card in the team's hand is a caliente at the end of the round, no points are lost. Calientes left in-hand at the end of the game are simply penalty point multiplier cards; they have no point value themselves.</p>

	<h4 class="bumper">Stop Cards</h4>
	<p>The player that ends the round (whether playing with teammates or as a solo team) can use stop cards to meld only if they go out and end the round in the same turn. If they do, these points can be added to the teams score with the "5pt / Green Cards" counter on the results page.</p>
	<p>Note: With a standard deck of cards the stop cards are the black threes.</p>

	<p class="bumper"><a href="#top" class="contentlink toplink">Back to Table of Contents</a></p>

	<h3 id="variations" class="greenheader lbumper">Game Variations</h3>
	<p>The variations of Canasta that are supported by this app:</p>
	<p>
		Classic Canasta: <span class="greenheader">Fully Supported</span><br>
		Canasta Caliente: <span class="greenheader">Fully Supported</span><br>
		National Canastas: <span class="redheader">Not Supported</span>
	</p>

	<h4 class="bumper">Classic Canasta and Canasta Caliente</h4>
	<p>The classic Canasta game and the hugely popular Canasta Caliente variation are fully supported by this scoring application. The app was developed with Canasta Caliente in mind.</p>
	<p>Classic Canasta players need only ignore all the "Caliente" references, and note that bonus cards are the same as red threes, where stop cards are the same as black threes.</p>
	<p>Enjoy! :)</p>

<?php
	/*
	<h4 class="bumper">Hand and Foot</h4>
	<p>The scoring of Hand and Foot and Canasta are very similar. The big difference that concerns how this app works is that the game lasts four rounds, regardless of the score. As Canasta ends the game at 5000pts, and Hand and Foot ends the game after four rounds, this app will work perfectly fine if a team does not have 5000pts or more at the end of the third round.</p>
	<p>A way around this issue is when you create a <a href="new.php" class="contentlink">new game</a> select that you are resuming a game, and give each team an equal large negative point value (-2000pts for instance) to eliminate the possibility of a team exceeding 5000pts as far as the score keeper is concerned. But as stated, this only becomes a problem if a team has 5000pts or more after the third round. Official support for Hand and Foot may be implemented.</p>
	<p>H&amp;F terms as Canasta terms: Clean books are natural canastas, dirty books are wild canastas, red threes are bonus cards, and black threes are stop cards.</p>
	*/
?>
	<h4 class="bumper">National Canastas</h4>
	<p>National and country-specific variations of Canasta are not supported by this application. The reason being each variation has scoring, winning value, and / or round-starting meld value differences which would not be possible to integrate into the app's score calculator and results display without creating rule sets for each specific variation.</p>
	<p>Some of these variations include Jonola (Canasta Five / New Zealand Canasta), Samba (Dutch Canasta), American Canasta, Cuban Canasta, Mexicana Canasta, Uruguay Canasta, and Joker Canasta.</p>

	<p class="bumper"><a href="#top" class="contentlink toplink">Back to Table of Contents</a></p>

	<h3 id="credits" class="greenheader lbumper">Credits</h3>
	<p>Created by <a href="https://formulatroy.com/" class="contentlink">FormulaTroy</a></p>
	<p class="bumper">Rules and Variation Information:</p>
	<ul>
		<li><a href="http://www.hasbro.com/common/instruct/Canasta_Caliente.pdf" target="_blank" class="contentlink">Hasbro</a></li>
		<li><a href="http://www.pagat.com/rummy/canasta.html" target="_blank" class="contentlink">Pagat Card Game Rules</a></li>
		<li><a href="http://www.rummy-games.com/rules/canasta.html" target="_blank" class="contentlink">Rummy Games</a></li>
	</ul>
	<p class="bumper">Developer Hat Tips:</p>
	<ul>
		<li><a href="http://www.famfamfam.com/lab/icons/" target="_blank" class="contentlink">FamFamFam</a></li>
		<li><a href="http://jquery.com/" target="_blank" class="contentlink">jQuery</a></li>
		<li><a href="http://jqueryvalidation.org/" target="_blank" class="contentlink">jQuery Validation Plugin</a></li>
		<li><a href="http://meyerweb.com/eric/tools/css/reset/" target="_blank" class="contentlink">CSS Reset</a></li>
	</ul>

	<p class="bumper"><a href="#top" class="contentlink toplink">Back to Table of Contents</a></p>

	<p class="center lbumper"><em>Thanks for using the Canasta Score Keeper app!</em></p>

	
</div><!-- end about -->

<?php 
	include 'inc/footer.php';
?>