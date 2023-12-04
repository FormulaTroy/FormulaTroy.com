<?php
$pageTitle = "Shutdown Macros";
include_once "php-inc/ft-functions.php";
include_once "php-inc/ft-header.php";
?>

<main>

  <?php
  # Hero
  CreateHeroText("Shutdown Marcos", "Scripts to be used with marco keys or Stream Decks");
  ?>

  <?php # Page ?>
  <div class="container">
    <div class="row g-3">
      <div class="col-12 col-lg-6">
        <p>The <strong>Shutdown Macros</strong> library is a collection of executable Batch (or PowerShell) scripts that automatically schedule a system shutdown on your machine for a set amount of hours in the future.</p>
        <p>For example, if you want to go to bed but your PC is still going to be downloading something for 90 minutes, you can quickly set a 2 hour shutdown timer so that the machine will auto shutoff after the download would have completed.</p>
        <p>There is also an abort script included if you want to have the option to cancel any pending shutdown.</p>
        <p>These can be used with any software that can automatically launch applications, like keyboard macro drivers or an Elgato Stream Deck.</p>
        <h4>Installation Steps</h4>
        <p>
          <ol>
            <li>Init</li>
            <li>Then just smack the button!</li>
          </ol>
        </p>
        <p>
          Now your Google Calendar should be in a spiffy dark mode UI theme! As I update the stylesheet to account for future updates to the Calendar UI, it will be automatically synced to you.</p>
      </div>
      <div class="col-12 col-lg-6">
        <p><img src="img/projects/shutdown.png" class="img-fluid" alt=""></p>
        <p><a class="btn btn-outline-secondary" href="https://github.com/FormulaTroy/FormulaTroy.com/tree/main/script/shutdown" role="button" target="_blank"><i class="bi bi-github"></i> View Code on GitHub</a></p>
        <p class="fs-2"><i class="bi bi-filetype-exe pe-3 ft-exe-badge"></i></p>
      </div>

    </div>
  </div>

</main>

<?php include_once "php-inc/ft-footer.php"; ?>
