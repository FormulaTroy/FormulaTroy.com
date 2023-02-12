<?php
include_once "php-inc/ft-functions.php";
include_once "php-inc/ft-header.php";
?>

<main>

  <?php
  # Hero
  CreateHeroText("FormulaTroy Project Index", "Everything is open source and free to be used or copied.");
  ?>

  <?php # Page ?>
  <div class="container">
    <div class="row row-cols-1 row-cols-md-2 row-cols-xl-3 g-3">

      <?php

      // Create the gallery of projects!
      // Function Args: CreateAppCard($projectTitle, $isApp, $imgPath, $linkPath, $githubPath, $techArray, $iconClass, $yearMade, $summaryText);

      // Google Calendar Dark Mode
      $techArray = ["css"];
      CreateAppCard("Google Calendar Dark Mode", false, "img/projects/ftgcdm.png", "#", "https://github.com/FormulaTroy/FormulaTroy.com/blob/main/theme/google-cal-dark/FTGoogleCalDarkMode.user.css", $techArray, "bi-calendar3", "2023", "Google Calendar's UI is so bright I can see the floaters in my eyes. This stylesheet adds Dark Mode to Google Calendar.");

      // Sim Racing Fuel Calculator
      $techArray = ["php", "scss"];
      CreateAppCard("Racing Fuel Calculator", true, "img/projects/racingcalc.png", "https://formulatroy.com/app/racing-calculator/", "https://github.com/FormulaTroy/FormulaTroy.com/tree/main/app/racing-calculator", $techArray, "bi-fuel-pump", "2016", "Sim Racing fuel calculator! The calculator will tell you how much fuel you need to put in the tank as well as if and/or how many fuel stops you need.");

      // Chessboard
      $techArray = ["js", "html", "css"];
      CreateAppCard("Chessboard", true, "img/projects/chess.png", "https://formulatroy.com/app/chess/", "https://github.com/FormulaTroy/FormulaTroy.com/tree/main/app/chess", $techArray, "bi-box-arrow-up-right", "2015", "Just a simple online chessboard to play locally that doesn't require you to sign up or display ads.");

      // Canasta Score Tracker
      $techArray = ["php", "js", "scss"];
      CreateAppCard("Canasta Score Tracker", true, "img/projects/canasta.png", "https://formulatroy.com/app/canasta/", "https://github.com/FormulaTroy/FormulaTroy.com/tree/main/app/canasta", $techArray, "bi-suit-spade-fill", "2014", "Canasta card game score tracker and round results calculator.")

        # End PHP
        ?>

    </div>
  </div>

</main>

<?php include_once "php-inc/ft-footer.php"; ?>
