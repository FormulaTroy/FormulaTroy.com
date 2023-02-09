<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Canasta | <?php echo $htmlTitle; ?> | Canasta Score Keeper</title>
<link href='http://fonts.googleapis.com/css?family=Open+Sans:300,400,400italic,600' rel='stylesheet' type='text/css'>
<link href="css/style.css" rel="stylesheet" type="text/css">
<script>
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
ga('create', 'UA-56791233-1', 'auto');
ga('require', 'displayfeatures');
ga('send', 'pageview');
</script>
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