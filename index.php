<?php
$pageTitle = "Index";
include_once "php-inc/ft-functions.php";
include_once "php-inc/ft-header.php";
?>

<main>

  <?php
  # Hero
  CreateHeroText("FormulaTroy Project Index", "Sharing random code things");
  ?>

  <?php # Page ?>
  <div class="container">
    <div class="row row-cols-1 row-cols-md-2 row-cols-xl-3 g-3">

      <?php

      // Create the gallery of projects!
      // Function Args: CreateAppCard($projectTitle, $isApp, $imgPath, $linkPath, $githubPath, $techArray, $iconClass, $yearMade, $summaryText);

      // Discord Themes
      $techArray = ["scss", "css"];
      CreateAppCard("Discord Themes", false, "img/projects/formuladiscord.png", "/discord", "https://github.com/FormulaTroy/FormulaTroy.com/tree/main/theme/discord", $techArray, "bi-discord", "2023-2024", "FormulaDiscord is an auto-updating set of over 10 themes for Discord that includes games like Baldur's Gate 3, Armored Core 6, and more!");

      // Google Calendar Dark Mode
      $techArray = ["css"];
      CreateAppCard("Google Cal<span class=\"d-md-none d-lg-inline d-xl-none d-xxl-inline\">endar</span> Dark Mode", false, "img/projects/ftgcdm.png", "/gc-dark", "https://github.com/FormulaTroy/FormulaTroy.com/blob/main/theme/google-cal-dark/FTGoogleCalDarkMode.user.css", $techArray, "bi-calendar3", "2023-2024", "Google Calendar's UI is so bright I can see the floaters in my eyes. This stylesheet adds Dark Mode to Google Calendar.");

      // Google Calendar Dark Mode
      $techArray = ["css"];
      CreateAppCard("Google Docs Dark Mode", false, "img/projects/ftgddm.png", "/gd-dark", "https://github.com/FormulaTroy/FormulaTroy.com/blob/main/theme/google-docs-dark/FTGoogleDocsDarkMode.user.css", $techArray, "bi-file-earmark-text", "2023", "Using online documents shouldn't burn your eyes. This stylesheet adds Dark Mode to Google Docs, Sheets, and the Drive UI.");

      // Shutdown Macros
      $techArray = ["exe"];
      CreateAppCard("Shutdown Macros", false, "img/projects/shutdown.png", "/shutdown", "https://github.com/FormulaTroy/FormulaTroy.com/tree/main/script/shutdown", $techArray, "bi-power", "2023", "Shutdown scheduler Batch scripts to be used with marco keys or Stream Decks.");

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
