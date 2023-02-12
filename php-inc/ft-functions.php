<?php

# Create hero title and subtitle
function HeroText($title, $subtitle) {
  echo "<section class=\"py-3 text-center container\">
          <div class=\"row py-lg-3\">
            <div class=\"col-lg-6 col-md-8 mx-auto\">
              <h1 class=\"fw-light\">$title</h1>
              <p class=\"lead text-muted\">$subtitle</p>
            </div>
          </div>
        </section>";
}

# end php
?>
