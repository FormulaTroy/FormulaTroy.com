<?php
$pageTitle = "Google Docs Dark Mode";
include_once "php-inc/ft-functions.php";
include_once "php-inc/ft-header.php";
?>

<main>

  <?php
  # Hero
  CreateHeroText("Google Docs Dark Mode", "Text Documents, Sheets, and the Drive UI");
  ?>

  <?php # Page ?>
  <div class="container">
    <div class="row g-3">
      <div class="col-12 col-lg-6">
        <p><strong>FTGoogleDocsDarkMode.user.css</strong> is a self-hosted user.css file powered by the Stylus browser
          extension. This stylesheet adds Dark Mode to Google Docs, Sheets, Drive, Contacts, and Share modals.</p>
        <h4>Installation Steps</h4>
        <p>
        <ol dir="auto">
          <li>Install the Stylus browser extension for either <i class="bi bi-browser-chrome"></i> <a
              href="https://chrome.google.com/webstore/detail/stylus/clngdbkpkpeebahjckkjfobafhncgmne" rel="nofollow"
              target="_blank">Chrome</a> or <i class="bi bi-browser-firefox"></i> <a
              href="https://addons.mozilla.org/firefox/addon/styl-us/" rel="nofollow" target="_blank">Firefox</a>.</li>
          <li>Click this install button:<br>
            <a href="https://formulatroy.github.io/FormulaTroy.com/theme/google-docs-dark/FTGoogleDocsDarkMode.user.css"
              rel="nofollow" target="_blank"><img
                src="https://camo.githubusercontent.com/38f4a54cadb545b720f0fe2084fdc24b0293b0c00171df5bc0a4be3c55587b72/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f496e7374616c6c2532306469726563746c79253230776974682d5374796c75732d3233386238622e737667"
                alt="Install directly with Stylus"
                data-canonical-src="https://img.shields.io/badge/Install%20directly%20with-Stylus-238b8b.svg"
                style="max-width: 100%;" target="_blank"></a>
          </li>
          <li>Click "Install Style" in the top left.</li>
        </ol>
        </p>
        <p>Now your Google Docs and Drive UI should be in a spiffy dark mode theme! As I update the stylesheet to account for future updates, it will be automatically synced to you.</p>
        <p>This is not as hand-crafted as the <a href="/gc-dark">Google Calendar Dark Mode</a> theme, so there are some rough edges. But it gets (most) of the job done with a far simpler method.</p>
      </div>
      <div class="col-12 col-lg-6">
        <p><img src="img/projects/ftgddm.png" class="img-fluid" alt=""></p>
        <p><a class="btn btn-outline-secondary" href="https://github.com/FormulaTroy/FormulaTroy.com/blob/main/theme/google-docs-dark/FTGoogleDocsDarkMode.user.css" role="button" target="_blank"><i class="bi bi-github"></i> View Code on GitHub</a></p>
        <p class="fs-2"><i class="bi bi-filetype-css pe-3 ft-css-badge"></i></p>
        <h4>Changelog</h4>
        <div class="accordion" id="changelog">
          <?php
            LogChange(101, "v1.0.1 - December 16th, 2023", "<ul>
                <li>First Release Candidate.</li>
                <li>Init global hue shifts with counters for media, icons, and background images.</li>
                <li>Let there be darkness!</li>
              </ul>");
          ?>
        </div>
      </div>

    </div>
  </div>

</main>

<?php include_once "php-inc/ft-footer.php"; ?>
