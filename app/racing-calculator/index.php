<!doctype html>
<html class="no-js" lang="en">
  <head>
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-V8QKSRXJ8R"></script>
    <script>window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-V8QKSRXJ8R');</script>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Racing Calculator App</title>
    <link rel="stylesheet" href="css/foundation.min.css" />
    <link rel="stylesheet" href="css/style.css" />
    <script src="js/vendor/modernizr.js"></script>
  </head>
  <body>

    <div class="contain-to-grid sticky">
      <nav class="top-bar" data-topbar data-options="sticky_on: small">
         <ul class="title-area">
          <li class="name">
            <h1><a href="https://www.formulatroy.com/"><span class="hide-small">Racing Calculator</span> By FormulaTroy</a></h1>
          </li>
           <!-- Remove the class "menu-icon" to get rid of menu icon. Take out "Menu" to just have icon alone -->
          <li class="toggle-topbar menu-icon"><a href="#"><span>Info</span></a></li>
        </ul>

        <section class="top-bar-section">
          <!-- Right Nav Section -->
          <ul class="right">
            <li class="active"><a href=""> App Version: 2.3 </a></li>
          </ul>

        </section>
      </nav>
    </div>


    <div class="row"><!--H1 and tooltip-->

      <div class="small-12 medium-7 columns">
        <h1>Racing Calculator</h1>
      </div>

      <div class="small-12 medium-5 columns help">
        <p><span data-tooltip class="has-tip" title="Welcome! Thanks for trying out the app!<br><br>To use the app input your information into<br> the form fields. Don't use any units, just<br>type the number.<br><br>Once it's all in just click 'Calculate the Data'!">
          First time? Hover here!
        </span></p>
      </div>

    </div>



<?php
  // Form submitted
  if ($_SERVER['REQUEST_METHOD'] == "POST") {
    // End to print HTML ?>
    <div class="row"><!--Results-->
      <div class="small-12 columns">
      <h2>Race Data Results</h2>
    <?php // Resume

    // Check all values are numeric or set, if not then set them to null
    if (is_numeric($_POST['race_length'])) {
      $race_length = $_POST['race_length'];
    } else {
      echo "<p class=\"error\">Please enter a numeric race length.</p>";
      $race_length = NULL;
    }

    if (isset($_POST['race_unit'])) {
      $race_unit = $_POST['race_unit'];
    } else {
      echo "<p class=\"error\">Please enter a race unit.</p>";
      $race_unit = NULL;
    }

    if (is_numeric($_POST['race_lap'])) {
      $race_lap = $_POST['race_lap'];
    } else {
      echo "<p class=\"error\">Please enter a numeric race lap time.</p>";
      $race_lap = NULL;
    }

    if (is_numeric($_POST['avg_fuel'])) {
      $avg_fuel = $_POST['avg_fuel'];
    } else {
      echo "<p class=\"error\">Please enter a numeric average fuel usage.</p>";
      $avg_fuel = NULL;
    }

    if (is_numeric($_POST['max_fuel'])) {
      $max_fuel = $_POST['max_fuel'];
    } else {
      echo "<p class=\"error\">Please enter a numeric fuel tank size.</p>";
      $max_fuel = NULL;
    }

    // Check all vars made it though error-checking by seeing if not-null
    if (isset($race_length) AND isset($race_unit) AND isset($race_lap) AND isset($avg_fuel) AND isset($max_fuel)) {
      echo "<p class=\"success\">Data processed successfully!</p>";

      // laps and fuel_needed based on race_unit
      if ($race_unit == "minutes") {
        $laps = (($race_length * 60) / $race_lap) + 1;
        $laps = round($laps);
        $fuel_needed = ($laps * $avg_fuel + 1);
        $fuel_needed = round($fuel_needed, 2);
      } else {
        $laps = $race_length;
        $laps = round($laps);
        $fuel_needed = ($laps * $avg_fuel + 1);
        $fuel_needed = round($fuel_needed, 2);
      }

      // fuel stop? + how many?
      if ($fuel_needed > $max_fuel) {
        $fuel_stop_needed = 1;
        $fuel_stop_count = $fuel_needed / $max_fuel;
        $fuel_stop_count = round($fuel_stop_count, 2);
      } else {
        $fuel_stop_needed = 0;
        $fuel_stop_count = 0;
      }

      // display results!
      echo '<div class="panel">';

      // laps
      echo "<p>Race Laps: <span class=\"output\">$laps laps</span></p>";

      // fuel needed
      echo "<p>Fuel Needed: <span class=\"output\">$fuel_needed liters</span><br>";
      echo "Fuel Tank Size: <span class=\"output\">$max_fuel liters</span></p>";

      // fuel tank size

      // if need stops or not? Will need 3 stops, or Will NOT need stops!
      if ($fuel_stop_needed == 1) {
        echo "<p>You <span class=\"output\">WILL</span> need a fuel stop.</p>";
        echo "<p>Fuel Tanks Needed: <span class=\"output\">$fuel_stop_count</span> tanks.</p>";
      } else {
        echo "<p>You <span class=\"output\">WILL NOT</span> need a fuel stop.</p>";
      }


      // different graphs if a stop is needed or not

      // stint graph primers
      $fuel_to_go = $fuel_stop_count * 100;
      $i = 1;

      if ($fuel_stop_needed == 1) {

        // Loop, all but last
        while($fuel_to_go>=100):
          echo "<p class=\"bar_title\">Stint #$i: Full Stint, $max_fuel liters</p>";
          echo '<div class="progress radius success bar">';
          echo '<span class="meter" style="width: 100%"></span>';
          echo '</div>';
          $fuel_to_go = $fuel_to_go - 100;
          $i++;
        endwhile;

        // Last stint
        $fuel_left = ($fuel_to_go / 100) * $max_fuel;
        $fuel_left_percent = ($fuel_left / $max_fuel) * 100;
        echo "<p class=\"bar_title\">Stint #$i: Partial Stint, $fuel_left liters</p>";
        // last bar is red if under a certain % left
        if ($fuel_left_percent <= 15) {
          echo "<div class=\"progress radius bar\">";
        } elseif ($fuel_left_percent >= 90) {
          echo "<div class=\"progress radius success bar\">";
        } else {
          echo "<div class=\"progress radius alert bar\">";
        }
        echo "<span class=\"meter\" style=\"width: $fuel_left_percent%\"></span>";
        echo '</div>';

      } elseif ($fuel_stop_needed == 0) {

        // stint graph primers
        $fuel_left = ($fuel_needed / $max_fuel) * 100;
        $i = 1;

        // Last stint
        echo "<p class=\"bar_title\">Stint #$i: Partial Stint, $fuel_needed liters</p>";
        // last bar is red if under a certain % left
        if ($fuel_left <= 15) {
          echo "<div class=\"progress radius bar\">";
        } elseif ($fuel_left >= 90) {
          echo "<div class=\"progress radius success bar\">";
        } else {
          echo "<div class=\"progress radius alert bar\">";
        }
        echo "<span class=\"meter\" style=\"width: $fuel_left%\"></span>";
        echo '</div>';

      }

      echo '</div>'; // End panel


    } // End parent if

    // End for HTML ?>
      <h3>Edit Data</h3>
      </div><!--end col-->
    </div><!--end row-->

  <?php // Resume to end if-statement
  }
// PHP end ?>

    <form method="POST" action="index.php"><!--Form-->
      <div class="row form">
        <div class="small-12 medium-8 medium-offset-2 columns"><!--PW-->

          <div class="row collapse">
            <label>How long is the race?</label>
            <div class="small-8 columns">
              <input type="number" step="any" name="race_length" required placeholder="Example: 120" value="<?php echo @"{$_POST['race_length']}";?>">
            </div>
            <div class="small-4 columns">
                <select name="race_unit">
                  <option value="minutes" <?php if ($_POST['race_unit']=="minutes") {echo 'selected="selected"';} ?> >Minutes</option>
                  <option value="laps" <?php if ($_POST['race_unit']=="laps") {echo 'selected="selected"';} ?>>Laps</option>
                </select>
            </div>
          </div><!--end row collapse-->

          <div class="row collapse">
            <label>What is the average race lap time?</label>
            <div class="small-8 columns">
              <input type="number" step="any" name="race_lap" required placeholder="Example: 92.349" value="<?php echo @"{$_POST['race_lap']}";?>">
            </div>
            <div class="small-4 columns">
                <span class="postfix">Seconds</span>
            </div>
          </div><!--end row collapse-->

          <div class="row collapse">
            <label>What is the average fuel usage per lap?</label>
            <div class="small-8 columns">
              <input type="number" step="any" name="avg_fuel" required placeholder="Example: 1.82" value="<?php echo @"{$_POST['avg_fuel']}";?>">
            </div>
            <div class="small-4 columns">
                <span class="postfix">Liters</span>
            </div>
          </div><!--end row collapse-->

          <div class="row collapse">
            <label>What is the fuel tank size?</label>
            <div class="small-8 columns">
              <input type="number" step="any" name="max_fuel" required placeholder="Example: 90" value="<?php echo @"{$_POST['max_fuel']}";?>">
            </div>
            <div class="small-4 columns">
                <span class="postfix">Liters</span>
            </div>
          </div><!--end row collapse-->

          <div class="row collapse">
              <input class="button small success" type="submit" value="Calculate the Data">
              <?php
                // Reset form input doesnt work after post
                // This links back to index after post
                if ($_SERVER['REQUEST_METHOD'] == "POST") {
                  echo '<a href="index.php" class="button small">Reset Application</a>';
                } else {
                  echo '<input class="button small" type="reset" value="Clear Form">';
                }
              ?>
          </div><!--end row collapse-->

        </div><!--end PW-->
      </div><!--end row panel-->
    </form>

    <div id="footer" class="row clear">
      <div class="small-12 columns text-center">
        <p>Made with <span class="heart">&hearts;</span> by <a href="https://www.formulatroy.com/">FormulaTroy</a></p>
      </div>
    </div>

    <script src="js/vendor/jquery.js"></script>
    <script src="js/foundation.min.js"></script>
    <script>
      $(document).foundation();
    </script>
  </body>
</html>
