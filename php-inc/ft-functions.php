<?php

# Create hero title and subtitle
function CreateHeroText($title, $subtitle) {
  echo "
    <section class=\"py-3 text-center container\">
      <div class=\"row py-lg-3\">
        <div class=\"col-lg-6 col-md-8 mx-auto\">
          <h1 class=\"fw-light\">$title</h1>
          <p class=\"lead text-muted\">$subtitle</p>
        </div>
      </div>
    </section>";
} // end function HeroText()

# Create homepage app index gallery cards
function CreateAppCard($projectTitle, $isApp, $imgPath, $linkPath, $githubPath, &$techArray, $iconClass, $yearMade, $summaryText) {

  // echo opening tags, img, title
  echo "
    <div class=\"col\">
      <div class=\"card shadow-sm\">
        <a href=\"$linkPath\"><img src=\"$imgPath\" alt=\"\"></a>
        <div class=\"card-body\">
          <h3 class=\"fw-light\"><a href=\"$linkPath\">$projectTitle</a></h3>
          <p class=\"fs-2\">";

  // loop through the tech array and display a badge icon for each tech
  foreach ($techArray as $key => $tech) {
    // create cases for each tech option
    switch ($tech) {

      case 'php':
        echo "<i class=\"bi bi-filetype-php pe-3 ft-php-badge\"></i>";
        break;

      case 'js':
        echo "<i class=\"bi bi-filetype-js pe-3 ft-js-badge\"></i>";
        break;

      case 'html':
        echo "<i class=\"bi bi-filetype-html pe-3 ft-html-badge\"></i>";
        break;

      case 'css':
        echo "<i class=\"bi bi-filetype-css pe-3 ft-css-badge\"></i>";
        break;

      case 'scss':
        echo "<i class=\"bi bi-filetype-scss pe-3 ft-scss-badge\"></i>";
        break;

      case 'exe':
        echo "<i class=\"bi bi-filetype-exe pe-3 ft-exe-badge\"></i>";
        break;

      default:
        echo "<p class=\"text-warning\">Unknown Tech!</p>";
        break;
    } // end switch ($tech)
  } // end foreach ($techArray

  // echo opening of button group
  echo "
          </p>
          <div class=\"d-flex justify-content-between align-items-center\">
            <div class=\"btn-group\">";

  // display either "Launch App" or "Project Page" button
  if ($isApp) {
    echo "<a class=\"btn btn-primary\" href=\"$linkPath\" role=\"button\"><i class=\"bi $iconClass\"></i> Launch App</a>";
  } else {
    echo "<a class=\"btn btn-primary\" href=\"$linkPath\" role=\"button\"><i class=\"bi $iconClass\"></i> Project Page</a>";
  }

  // echo link to code button, year made tag, summary text, and closing tags
  echo "
              <a class=\"btn btn-outline-secondary\" href=\"$githubPath\" role=\"button\" target=\"_blank\"><i class=\"bi bi-github\"></i> Code</a>
            </div>
            <small class=\"text-muted\"><i class=\"bi bi-code-slash\"></i> $yearMade</small>
          </div>
          <p class=\"card-text pt-3\">$summaryText</p>
        </div>
      </div>
    </div>";

} // end function AppCard()

# Create changelog entries on a project page
function LogChange($ID, $changeTitle, $changeText) {
  echo "
    <div class=\"accordion-item\">
      <h2 class=\"accordion-header\">
        <button class=\"accordion-button collapsed\" type=\"button\" data-bs-toggle=\"collapse\"
          data-bs-target=\"#changelog$ID\" aria-expanded=\"false\"
          aria-controls=\"changelog$ID\">$changeTitle</button>
      </h2>
      <div id=\"changelog$ID\" class=\"accordion-collapse collapse\" data-bs-parent=\"#changelog\">
        <div class=\"accordion-body\">$changeText</div>
      </div>
    </div>";
} // end LogChange()

# end php
?>
