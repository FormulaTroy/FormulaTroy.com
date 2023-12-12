<!DOCTYPE html>
<html lang="en">

<head>
	<script async src="https://www.googletagmanager.com/gtag/js?id=G-V8QKSRXJ8R"></script>
	<script>
		window.dataLayer = window.dataLayer || [];

		function gtag() {
			dataLayer.push(arguments);
		}
		gtag('js', new Date());
		gtag('config', 'G-V8QKSRXJ8R');
	</script>
	<meta charset="UTF-8">
	<title>Canasta | <?php echo $htmlTitle; ?> | Canasta Score Keeper</title>
	<link href='https://fonts.googleapis.com/css?family=Open+Sans:300,400,400italic,600' rel='stylesheet' type='text/css'>
	<link href="css/style.css" rel="stylesheet" type="text/css">
</head>

<body>
	<div id="header">
		<div class="pagewrapper">
			<h1><a href="index.php">Canasta Score Keeper</a></h1>
			<h2>Easy Calculator, Stats, and Standings!</h2>
			<p class="creditlink showlarge"><a href="https://www.formulatroy.com/">Created by FormulaTroy</a></p>
		</div><!--end pagewrapper-->
	</div><!--end header-->
	<div id="content" class="clear">
		<div class="pagewrapper center">
			<?php
			if (isset($_SESSION['gameStarted']) && $_SESSION['gameStarted'] == 1) {
				appNav();
			}
			?>
