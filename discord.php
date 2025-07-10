<?php
$pageTitle = "Discord Themes";
include_once "php-inc/ft-functions.php";
include_once "php-inc/ft-header.php";
?>

<main>

  <?php
  # Hero
  CreateHeroText("FormulaDiscord", "Auto-updating collection of Discord themes");
  ?>

  <div class="container">
    <div class="alert alert-warning" role="alert">
      These themes currently are not working as intended as ClearVision (the base theme) had a major version update recently.
    </div>
  </div>

  <?php # Page ?>
  <div class="container">

    <?php # FormulaDiscord Details ?>
    <div class="row g-3">
      <div class="col-12 col-lg-6">

        <p><strong>FormulaDiscord</strong> is an auto-updating set of over 10 themes for Discord that includes games like Baldur's Gate 3, Armored Core 6, and more!</p>
        <div class="row g-3">
          <div class="col-8">
            <p>These sub-themes are built off ClearVision, one of the most reliable and customizable Discord themes, and powered by BetterDiscord.</p>
          </div>
          <div class="col-4">
            <p><img src="https://betterdiscord.app/resources/branding/logo_large.svg" class="img-fluid" alt="Better Discord Logo" style="max-width:150px;"></p>
          </div>
        </div>
        <p>Hundreds of lines of code extend the UI beyond just what the base theme has however, which apply to all of the themes. Then on top of that, each final theme also has unique customizations.</p>
        <p><img src="/img/discord/RadialPreview.png" class="img-fluid rounded" alt=""></p>
        <p>The themes also include and customize Radial Status, which spruces up the online status displays.</p>

        <?php # Install Steps ?>
        <h3>Installation Steps</h3>
        <p>1. Download and install BetterDiscord.<br>Note: You will need to re-do this step every time Discord updates, and yes, it is as annoying as it sounds.</p>
        <p><a href="https://github.com/BetterDiscord/Installer/releases/latest/download/BetterDiscord-Windows.exe" class="btn btn-primary btn-sm btn-bd-colors"><i class="bi bi-download"></i> Windows</a> <a href="https://github.com/BetterDiscord/Installer/releases/latest/download/BetterDiscord-Linux.AppImage" class="btn btn-primary btn-sm btn-bd-colors"><i class="bi bi-download"></i> Linux</a></p>
        <p class="pt-2">2. Download the FormulaDiscord theme pack.</p>
        <p><a href="https://formulatroy.github.io/FormulaTroy.com/theme/discord/deploy/dl-FormulaDiscordThemeBundle.zip" class="btn btn-primary btn-sm btn-bd-colors"><i class="bi bi-download"></i> FormulaDiscord</a></p>
        <p>3. Go into your Discord settings. Towards the bottom there will now be a "Themes" tab. Go in there, and click "Open Themes Folder" at the top.</p>
        <p>4. Place whichever theme(s) you want from the FormulaDiscord download into the themes folder that opened up.</p>
        <p>5. Go back to Discord and enable one!</p>
      </div>

      <div class="col-12 col-lg-6">

        <?php # Image Slider ?>
        <div id="carousel" class="carousel slide" data-bs-ride="carousel" style="max-width: 550px;">
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img src="img/projects/formuladiscord.png" class="d-block w-100" alt="">
            </div>
            <div class="carousel-item">
              <img src="img/projects/formuladiscord2.png" class="d-block w-100" alt="">
            </div>
            <div class="carousel-item">
              <img src="img/projects/formuladiscord3.png" class="d-block w-100" alt="">
            </div>
            <div class="carousel-item">
              <img src="img/projects/formuladiscord4.png" class="d-block w-100" alt="">
            </div>
          </div>
          <button class="carousel-control-prev" type="button" data-bs-target="#carousel" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#carousel" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
        <p>&nbsp;</p>

        <p><a class="btn btn-outline-secondary" href="https://github.com/FormulaTroy/FormulaTroy.com/tree/main/theme/discord" role="button" target="_blank"><i class="bi bi-github"></i> View Code on GitHub</a></p>

        <p class="fs-2"><i class="bi bi-filetype-scss pe-3 ft-scss-badge"></i><i class="bi bi-filetype-css pe-3 ft-css-badge"></i></p>

        <h4>FAQs</h4>
        <div class="accordion" id="theme-list" class="mb-5">

          <div class="accordion-item">
            <h2 class="accordion-header">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq1" aria-expanded="false" aria-controls="faq1">What is the full list of themes?</button>
            </h2>
            <div id="faq1" class="accordion-collapse collapse" data-bs-parent="#theme-list">
              <div class="accordion-body">
                <div class="row">
                  <div class="col-6">
                    <ul>
                      <li>Armored Core 6</li>
                      <li>Alan Wake II</li>
                      <li>Baldur's Gate 3</li>
                      <li>Cyberpunk 2077</li>
                      <li>Dark Mode</li>
                      <li>Dishonored 2</li>
                    </ul>
                  </div>
                  <div class="col-6">
                    <ul>
                      <li>OLED Black Ink</li>
                      <li>Splinter Cell Blacklist</li>
                      <li>Star Citizen</li>
                      <li>Tekken 8</li>
                      <li>Wayfinder</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="accordion-item">
            <h2 class="accordion-header">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq2" aria-expanded="false" aria-controls="faq2">Can I customize the themes?</button>
            </h2>
            <div id="faq2" class="accordion-collapse collapse" data-bs-parent="#theme-list">
              <div class="accordion-body">
                <p>You're probably wanting to change the background image or the accent color. And don't feel bad or weird about doing so! Have fun with it. Here's how.</p>
                <p>Go to Discord > Settings > Themes and then click the pencil edit icon on the theme you want to edit.</p>
                <p>Add the following code to the bottom of the file editor that opened up:</p>
                <pre style="color:var(--bs-teal);"><strong><code>:root {<br>&nbsp;&nbsp;--main-color: #000000;<br>&nbsp;&nbsp;--background-image: url("https://");<br>}</code></strong></pre>
                <p>Fill in a hex color code and/or a URL to a publicly accessible image. Delete the line(s) if you want to go back to the one that ships with the theme.</p>
                <p>And that's it!</p>
                <p>However, those are just the 2 most common variables. There are many variables available to be overwritten in the same way. For a full list, check out this file: <a href="https://github.com/FormulaTroy/FormulaTroy.com/blob/main/theme/discord/scss-inc/vars-base.scss" target="_blank">vars-base.scss</a></p>
              </div>
            </div>
          </div>

          <div class="accordion-item">
            <h2 class="accordion-header">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq3" aria-expanded="false" aria-controls="faq3">Will I have to come back and download updates?</button>
            </h2>
            <div id="faq3" class="accordion-collapse collapse" data-bs-parent="#theme-list">
              <div class="accordion-body">
                <p>Nope! Every time you launch Discord it automatically grabs the latest version, which will be noted in the Discord title bar.</p>
                <p>Note: The version number in the Theme settings screen will NOT update, and that's fine. The version number in the title bar is all that matters.</p>
              </div>
            </div>
          </div>

        </div>
        <p>&nbsp;</p>

        <h4>Changelog</h4>
        <div class="accordion" id="changelog">
          <?php
            LogChange(110, "v1.1.0 - December 21st, 2023", "<ul>
              <li>First release candidate, with 11 themes!</li>
              <li>Massive thanks to folks behind BetterDiscord, ClearVision, and Radial Status.</li>
            </ul>");
          ?>
        </div>
      </div>
    </div>

  </div>

</main>

<?php include_once "php-inc/ft-footer.php"; ?>
