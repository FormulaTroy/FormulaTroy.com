<?php

# Create hero title and subtitle
function CreateHeroText($title, $subtitle)
{
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
function CreateAppCard($projectTitle, $isApp, $imgPath, $linkPath, $githubPath, &$techArray, $iconClass, $yearMade, $summaryText)
{

  // echo opening tags, img, title
  echo "
    <div class=\"col\">
      <div class=\"card shadow-sm\">
        <a href=\"$linkPath\"><img src=\"$imgPath\" alt=\"\"></a>
        <div class=\"card-body\">
          <h3 class=\"fw-light\">$projectTitle</h3>
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
    echo "<a class=\"btn btn-primary\" href=\"$linkPath\" role=\"button\" target=\"_blank\"><i class=\"bi $iconClass\"></i> Launch App</a>";
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

# Create Rows in the Gaming Tables
function AddGame($name, $rating, $date, $hours, $platform, $notes, $imgPath)
{
  // opening tag
  echo "<tr>";

  // rating and backlog status
  switch ($rating) {

    case "10":
      echo '<td class="text-center" style="color:#ffcc66;"><i class="fs-1 bi bi-trophy-fill"></i><span class="d-none">10</span></td>';
      break;

    case '9':
      echo '<td class="text-center" style="color:#66ff66;"><i class="fs-1 bi bi-9-square-fill"></i><span class="d-none">9</span></td>';
      break;

    case '8':
      echo '<td class="text-center" style="color:#0277d2;"><i class="fs-1 bi bi-8-circle-fill"></i><span class="d-none">8</span></td>';
      break;

    case '7':
      echo '<td class="text-center" style="color:#6e64ff;"><i class="fs-2 bi bi-7-square"></i><span class="d-none">7</span></td>';
      break;

    case '6':
      echo '<td class="text-center" style="color:#a64aab;"><i class="fs-2 bi bi-6-square"></i><span class="d-none">6</span></td>';
      break;

    case '5':
    case '4':
    case '3':
    case '2':
    case '1':
    case '0':
      echo '<td class="text-center" style="color:#b22a3e;"><i class="fs-2 bi bi-' . $rating . '-circle"></i><span class="d-none">' . $rating . '</span></td>';
      break;

    case 'playing':
      echo '<td class="text-center" style="color:#66ff66;"><i class="fs-1 bi bi-controller"></i><span class="d-none">9</span></td>';
      break;

    case 'next':
      echo '<td class="text-center" style="color:#0277d2;"><i class="fs-1 bi bi-upload"></i><span class="d-none">7</span></td>';
      break;

    case 'backlog':
      echo '<td class="text-center" style="color:#a64aab;"><i class="fs-2 bi bi-database"></i><span class="d-none">5</span></td>';
      break;

    case 'wishlist':
      echo '<td class="text-center" style="color:#b22a3e;"><i class="fs-2 bi bi-coin"></i><span class="d-none">3</span></td>';
      break;

    default:
      echo "<td class=\"text-warning\">Error in rating!</td>";
      break;
  } // end switch ($rating)

  // key art
  if ($imgPath) {
    echo '<td><img src="' . $imgPath . '" alt="" height="75px"></td>';
  } else {
    echo '<td></td>';
  }

  // title and comments
  if ($notes && $name) {
    echo '<td><span class="fs-4">' . $name . '</span><br><span>' . $notes . '</span></td>';
  } else if ($name) {
    echo '<td><span class="fs-4">' . $name . '</span></td>';
  } else {
    echo '<td></td>';
  }

  // platform
  switch ($platform) {

    case 'Steam':
    case 'SD':
    case 'Steam Deck':
      echo '<td><span class="fs-2" style="color:#125587"><i class="bi bi-steam"></i></span><br>PC (Steam)</td>';
    break;

    case 'Epic':
    case 'Epic Games':
      echo '<td><span class="fs-2" style="color:#bb36b6"><i class="bi bi-unity"></i></span><br>PC (Epic Games)</td>';
    break;

    case 'PC':
      echo '<td><span class="fs-2" style="color:#00a8e8"><i class="bi bi-windows"></i></span><br>PC</td>';
    break;

    case 'PS4':
      echo '<td><span class="fs-2" style="color:#004094"><i class="bi bi-playstation"></i></span><br>PlayStation 4</td>';
    break;

    case 'PS3':
      echo '<td><span class="fs-2" style="color:#004094"><i class="bi bi-playstation"></i></span><br>PlayStation 3</td>';
    break;

    case 'PS2':
      echo '<td><span class="fs-2" style="color:#004094"><i class="bi bi-playstation"></i></span><br>PlayStation 2</td>';
    break;

    case 'Switch':
      echo '<td><span class="fs-2" style="color:#e60012"><i class="bi bi-nintendo-switch"></i></span><br>Nintendo Switch</td>';
    break;

    case 'Mobile':
    case 'Android':
      echo '<td><span class="fs-2" style="color:#73bb56"><i class="bi bi-android2"></i></span><br>Mobile</td>';
    break;

    case 'Game Pass':
    case 'Xbox':
      echo '<td><span class="fs-2" style="color:#0f780f"><i class="bi bi-xbox"></i></span><br>Game Pass</td>';
    break;

    case 'GBA':
      echo '<td><span class="fs-2" style="color:#00a8e8"><i class="bi bi-controller"></i></span><br>Game Boy Advance</td>';
    break;

    case 'TBD':
      echo '<td>TBD</td>';
    break;

    default:
      echo '<td><span style="color:#e60012">Error in platform!</span></td>';
    break;
  }

  // hours played or hours estimate
  echo '<td>'.$hours.'</td>';

  // date completed or date released
  echo '<td>'.$date.'</td>';

  // closing tag
  echo "</tr>";
}

# end php
?>

