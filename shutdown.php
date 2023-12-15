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
        <p>The <strong>Shutdown Macros</strong> library is a collection of executable Batch scripts that automatically schedule a shutdown (or restart) of your machine.</p>
        <p>For example, if you want to go to bed but your PC is still going to be downloading something for 90 minutes, you can quickly set a 2 hour shutdown timer so that the machine will auto shutoff after the download would have completed.</p>
        <p>There is also an abort script included if you want to have the option to cancel any pending shutdown.</p>
        <p>These can be used with any software that can automatically launch applications, like keyboard macro drivers or an Elgato Stream Deck. They can also be run directly by double-clicking the files.</p>
        <p><a href="https://formulatroy.github.io/FormulaTroy.com/script/shutdown/download/ShutdownMacroScriptLibrary-v1.2.zip" class="btn btn-primary"><i class="bi bi-download"></i> Download Scripts v1.2</a></p>
        <h4>Installation Steps</h4>
        <p><em>Using Stream Deck as an example</em></p>
        <p>
          <ol>
            <li>Download the scripts with the link above and extract them somewhere on your PC.</li>
            <li>Drag a .bat file onto an empty Stream Deck button slot.</li>
            <li>Set the button text (i.e. "1 Hr").</li>
            <li>Set the button background with the included images.</li>
            <li>Then just smack the button!</li>
          </ol>
        </p>
      </div>

      <div class="col-12 col-lg-6">
        <p><img src="img/projects/shutdown.png" class="img-fluid" alt=""></p>
        <p><a class="btn btn-outline-secondary" href="https://github.com/FormulaTroy/FormulaTroy.com/tree/main/script/shutdown" role="button" target="_blank"><i class="bi bi-github"></i> View Code on GitHub</a></p>
        <p class="fs-2"><i class="bi bi-filetype-exe pe-3 ft-exe-badge"></i></p>
        <h4>Changelog</h4>
        <div class="accordion" id="changelog">
          <?php
            LogChange(12, "v1.2 Expand Functionality", "Added a shutdown 'now' option. Added restart options for all 5 time intervals. Removed the PowerShell versions.");
            LogChange(11, "v1.1 The Bats", "Convert to Bat files instead. These are directly usable with StreamDeck's Run Action, avoiding the need to use the WindowsScriptDeck plugin.");
            LogChange(10, "v1.0 Init", "Init the project as a collection of PowerShell scripts that schedule shutdowns with a message box confirmation.");
          ?>
        </div>
      </div>
    </div>

  </div>

</main>

<?php include_once "php-inc/ft-footer.php"; ?>
