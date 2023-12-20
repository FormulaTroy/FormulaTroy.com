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
            <p><img src="https://betterdiscord.app/resources/branding/logo_large.svg" class="img-fluid" alt="Better Discord Logo"></p>
          </div>
        </div>
        <p>Over 200 lines of code extend the UI beyond just what the base theme has however, which apply to all of my themes. Then on top of that, each final theme also has unique customizations.</p>
        <div class="row g-3">
          <div class="col-7">
            <p><img src="/img/discord/RadialPreview.png" class="img-fluid rounded" alt=""></p>
          </div>
          <div class="col-5">
            <p>The themes also include and customize Radial Status, which spruces up the online status displays.</p>
          </div>
        </div>

        <?php # Theme List ?>
        <div class="accordion" id="theme-list" class="mb-5">
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#theme-list121" aria-expanded="false" aria-controls="theme-list121">Full List of Themes</button>
            </h2>
            <div id="theme-list121" class="accordion-collapse collapse" data-bs-parent="#theme-list">
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
        </div>
        <p>&nbsp;</p>

        <?php # Install Steps ?>
        <h3>Installation Steps</h3>
        <p>1. Download and install BetterDiscord.</p>
        <p dir="auto"><a href="https://github.com/BetterDiscord/Installer/releases/latest/download/BetterDiscord-Windows.exe"><img src="https://camo.githubusercontent.com/d65af3962c5c37b3b41e953af4695fb1c09c8187ab45bb48f9e5865354978ab9/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f57696e646f777325323028372b292d3361373163313f6c6f676f3d57696e646f7773266c6f676f436f6c6f723d336137316331266c6162656c436f6c6f723d30633064313026636f6c6f723d336137316331267374796c653d666f722d7468652d6261646765" alt="Windows Installer" data-canonical-src="https://img.shields.io/badge/Windows%20(7+)-3a71c1?logo=Windows&amp;logoColor=3a71c1&amp;labelColor=0c0d10&amp;color=3a71c1&amp;style=for-the-badge" style="max-width: 100%;"></a> <a href="https://github.com/BetterDiscord/Installer/releases/latest/download/BetterDiscord-Mac.zip"><img src="https://camo.githubusercontent.com/aa3dad1b965a141a45b75703bb5284efe7c79790629e40501a99459acd2dfa8d/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f6d61634f532532302831302e31302b292d3361373163313f6c6f676f3d4170706c65266c6f676f436f6c6f723d336137316331266c6162656c436f6c6f723d30633064313026636f6c6f723d336137316331267374796c653d666f722d7468652d6261646765" alt="Mac Installer" data-canonical-src="https://img.shields.io/badge/macOS%20(10.10+)-3a71c1?logo=Apple&amp;logoColor=3a71c1&amp;labelColor=0c0d10&amp;color=3a71c1&amp;style=for-the-badge" style="max-width: 100%;"></a> <a href="https://github.com/BetterDiscord/Installer/releases/latest/download/BetterDiscord-Linux.AppImage"><img src="https://camo.githubusercontent.com/b51eb2517acb843df2529e1033bfcf69fc636299d1ab79de8f85aa193f78c81e/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4c696e75782d3361373163313f6c6f676f3d4c696e7578266c6f676f436f6c6f723d336137316331266c6162656c436f6c6f723d30633064313026636f6c6f723d336137316331267374796c653d666f722d7468652d6261646765" alt="Linux Installer" data-canonical-src="https://img.shields.io/badge/Linux-3a71c1?logo=Linux&amp;logoColor=3a71c1&amp;labelColor=0c0d10&amp;color=3a71c1&amp;style=for-the-badge" style="max-width: 100%;"></a></p>
        <p class="pt-2">2. Download the FormulaDiscord theme pack.</p>
        <p><a href="https://formulatroy.github.io/FormulaTroy.com/theme/discord/deploy/dl-FormulaDiscordThemeBundle.zip" class="btn btn-primary btn-sm"><i class="bi bi-download"></i> FormulaDiscord</a></p>
        <p>3. Go into your Discord settings. Towards the bottom there will now be a "Themes" tab. Go in there, and click "Open Themes Folder" at the top.</p>
        <p>4. Place whichever theme(s) you want from the FormulaDiscord download into the themes folder that opened up.</p>
        <p>5. Go back to Discord and enable one!</p>
      </div>















      <div class="col-12 col-lg-6">
        <p><img src="img/projects/formuladiscord.png" class="img-fluid rounded" alt=""></p>
        <p><a class="btn btn-outline-secondary" href="https://github.com/FormulaTroy/FormulaTroy.com/tree/main/script/shutdown" role="button" target="_blank"><i class="bi bi-github"></i> View Code on GitHub</a></p>
        <p class="fs-2"><i class="bi bi-filetype-exe pe-3 ft-exe-badge"></i></p>
        <h4>Changelog</h4>
        <div class="accordion" id="changelog">
          <?php
          LogChange(121, "v1.2.1 - December 15th, 2023", "<ul>
              <li>Themed the Create button drop down menu.</li>
              <li>Themed the Event Time Zone selection modal window.</li>
            </ul>");
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
