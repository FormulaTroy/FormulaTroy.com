</div><!--end pagewrapper-->
</div><!--end content-->
<div id="footer" class="clear">
<div class="pagewrapper">
<h1><a href="index.php">Canasta Score Keeper</a></h1>
<ul>
<li><a href="index.php">Home</a></li>
<li><a href="about.php">About</a></li>
<li><a href="feedback.php">Feedback</a></li>
</ul>
<p class="creditlink"><a href="https://www.formulatroy.com/">&copy; FormulaTroy</a></p>
</div><!--end pagewrapper-->
</div><!--end footer-->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
<?php
	if ($htmlTitle == "Results" || $htmlTitle == "Feedback") {
		echo '<script src="https://ajax.aspnetcdn.com/ajax/jquery.validate/1.13.0/jquery.validate.min.js"></script>' . "\n";
	}
 ?>
<script src="js/canasta.js"></script>
</body>
</html>
