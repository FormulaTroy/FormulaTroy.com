<?php
$pageTitle = "Google Calendar Dark Mode";
include_once "php-inc/ft-functions.php";
include_once "php-inc/ft-header.php";
?>

<main>

  <?php
  # Hero
  CreateHeroText("Google Calendar Dark Mode", "Calendar is so bright I can see the floaters in my eyes");
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
              rel="nofollow" target="_blank"><img
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
        <p><img src="img/projects/ftgcdm.png" class="img-fluid rounded" alt=""></p>
        <p><a class="btn btn-outline-secondary" href="https://github.com/FormulaTroy/FormulaTroy.com/blob/main/theme/google-cal-dark/FTGoogleCalDarkMode.user.css" role="button" target="_blank"><i class="bi bi-github"></i> View Code on GitHub</a></p>
        <p class="fs-2"><i class="bi bi-filetype-css pe-3 ft-css-badge"></i></p>
        <h4>Changelog</h4>
        <div class="accordion" id="changelog">
          <?php
            LogChange(121, "v1.2.1 - December 15th, 2023", "<ul>
              <li>Themed the Create button drop down menu.</li>
              <li>Themed the Event Time Zone selection modal window.</li>
            </ul>");
            LogChange(120, "v1.2.0 - December 2nd, 2023", "<ul>
                <li>Clean up homepage UI discrepancies stemming from class name changes on Google's side.</li>
                <li>Clean up Create/Edit Event screen discrepancies stemming from class name changes on Google's side.</li>
                <li>Override icon colors to be forced into the same color states as the rest of their neighbors.</li>
                <li>Changed box models of various Create/Edit Event screen UI elements to make them all align. This feels like a bug on Google's side with negative margins that may get fixed at some point.</li>
                <li>Themed the Create/Edit Event screen dropdowns and in-form buttons.</li>
                <li>Themed the Calendar view selector (week, month, etc).</li>
              </ul>");
            LogChange(114, "v1.1.4 - February 26th, 2023", "<ul>
                <li>Fixed theming issues with the top left calendar and date picker.</li>
                <li>Themed the collapsable right side panel.</li>
                <li>Edit event title colors.</li>
              </ul>");
            LogChange(110, "v1.1.0 - February 10th, 2023", "<ul>
                <li>First Release Candidate.</li>
                <li>Init core variables and override Google variables.</li>
                <li>Create global color and background-color override statements.</li>
                <li>Automatic update URL hosted by GitHub Pages deployment.</li>
                <li>Let there be darkness!</li>
              </ul>");
          ?>
        </div>
      </div>

    </div>
  </div>

</main>

<?php include_once "php-inc/ft-footer.php"; ?>
