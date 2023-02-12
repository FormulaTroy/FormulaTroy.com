<?php
$pageTitle = "Google Calendar Dark Mode";
include_once "php-inc/ft-functions.php";
include_once "php-inc/ft-header.php";
?>

<main>

  <?php
  # Hero
  CreateHeroText("Google Calendar Dark Mode", "Calendar is so bright I can see the floaters in my eyes.");
  ?>

  <?php # Page ?>
  <div class="container">
    <div class="row g-3">
      <div class="col-12 col-lg-6">
        <p><strong>FTGoogleCalDarkMode.user.css</strong> is a self-hosted user.css file powered by the Stylus browser
          extension. This stylesheet adds Dark Mode to Google Calendar.</p>
        <h4>Installation Steps</h4>
        <p>
        <ol dir="auto">
          <li>Install the Stylus browser extension for either <i class="bi bi-browser-chrome"></i> <a
              href="https://chrome.google.com/webstore/detail/stylus/clngdbkpkpeebahjckkjfobafhncgmne" rel="nofollow"
              target="_blank">Chrome</a> or <i class="bi bi-browser-firefox"></i> <a
              href="https://addons.mozilla.org/firefox/addon/styl-us/" rel="nofollow" target="_blank">Firefox</a>.</li>
          <li>Click this install button:<br>
            <a href="https://formulatroy.github.io/FormulaTroy.com/theme/google-cal-dark/FTGoogleCalDarkMode.user.css"
              rel="nofollow"><img
                src="https://camo.githubusercontent.com/38f4a54cadb545b720f0fe2084fdc24b0293b0c00171df5bc0a4be3c55587b72/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f496e7374616c6c2532306469726563746c79253230776974682d5374796c75732d3233386238622e737667"
                alt="Install directly with Stylus"
                data-canonical-src="https://img.shields.io/badge/Install%20directly%20with-Stylus-238b8b.svg"
                style="max-width: 100%;" target="_blank"></a>
          </li>
          <li>Click "Install Style" in the top left.</li>
        </ol>
        </p>
        <p>
          Now your Google Calendar should be in a spiffy dark mode UI theme! As I update the stylesheet to account for
          future updates to the Calendar UI, it will be automatically synced to you.</p>
      </div>
      <div class="col-12 col-lg-6">
        <p><img src="img/projects/ftgcdm.png" class="img-fluid" alt=""></p>
        <p><a class="btn btn-outline-secondary" href="https://github.com/FormulaTroy/FormulaTroy.com/blob/main/theme/google-cal-dark/FTGoogleCalDarkMode.user.css" role="button" target="_blank"><i class="bi bi-github"></i> View Code on GitHub</a></p>
        <p class="fs-2"><i class="bi bi-filetype-css pe-3 ft-css-badge"></i></p>
      </div>

    </div>
  </div>

</main>

<?php include_once "php-inc/ft-footer.php"; ?>
