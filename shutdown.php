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
        <p>These can be used with any software that can automatically launch applications, like keyboard macro drivers or an Elgato Stream Deck. They can also just be run directly by double-clicking the files.</p>
        <p><a href="https://formulatroy.github.io/FormulaTroy.com/script/shutdown/download/ShutdownMacroScriptLibrary.zip" class="btn btn-primary"><i class="bi bi-download"></i> Download Scripts</a></p>
        <h4>Installation Steps</h4>
        <p><em>Using Stream Deck as an example</em></p>
        <p>
          <ol>
            <li>Download the scripts with the link above and extract them somewhere on your PC.</li>
            <li><em>(Optional)</em> Create an action folder to house all of the macros.</li>
            <li>Drag the <strong>System > Open</strong> action into the screen.</li>
            <li>Click the 'Select a file...' option and browse to a script.</li>
            <li>Set the button text (i.e. "1 Hour").</li>
            <li><em>(Optional)</em> Set the button background with the included images.</li>
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
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#changelog11" aria-expanded="false" aria-controls="changelog11">
                v1.1 The Bats
              </button>
            </h2>
            <div id="changelog11" class="accordion-collapse collapse" data-bs-parent="#changelog">
              <div class="accordion-body">
                Convert to Bat files instead. These are directly usable with StreamDeck's Run Action, avoiding the need to use the WindowsScriptDeck plugin.
              </div>
            </div>
          </div>
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#changelog1" aria-expanded="false" aria-controls="changelog1">
                v1.0 Init
              </button>
            </h2>
            <div id="changelog1" class="accordion-collapse collapse" data-bs-parent="#changelog">
              <div class="accordion-body">
                Init the project as a collection of PowerShell scripts that schedule shutdowns with a message box confirmation.
              </div>
            </div>
          </div>
        </div><!-- end div.accordion -->
      </div>
    </div>

  </div>

</main>

<?php include_once "php-inc/ft-footer.php"; ?>
