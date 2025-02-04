<?php
$pageTitle = "Sim Racing Fuel Calculator";
include_once "php-inc/ft-functions.php";
include_once "php-inc/ft-header.php";
?>

<main>

  <?php
  CreateHeroText("Fuel Calculator", "Sim Racing Pit Stop Planner");
  ?>


  <div class="container">

    <!-- calculator type selector -->
    <div class="row">
      <div class="col text-center">
        <div class="btn-group" role="group">
          <input type="radio" class="btn-check" name="calcType" id="calcShorthand" autocomplete="off">
          <label class="btn btn-outline-primary" for="calcShorthand">Shorthand</label>

          <input type="radio" class="btn-check" name="calcType" id="calcSprint" autocomplete="off" checked>
          <label class="btn btn-outline-primary" for="calcSprint">Sprint Race</label>

          <input type="radio" class="btn-check" name="calcType" id="calcEndurance" autocomplete="off">
          <label class="btn btn-outline-primary" for="calcEndurance">Endurance Race</label>
        </div>
      </div>
    </div>

    <!-- calculator inputs and results wrapper -->
    <div class="row mt-5">
      <div class="col-12 col-lg-6">

        <!-- calculator type and description -->
        <h4 id="js-calc-type-header">{calcType} Inputs</h4>
        <div id="js-calc-type-desc-wrapper">
          <div class="js-calc-type-desc-shorthand">
            <p>The <strong>Shorthand</strong> calculator is a quick timed race estimation formula with a single text box as the input. It does not visually display fuel stints or offer many options.</p>
          </div>
          <div class="js-calc-type-desc-sprint">
            <p>The <strong>Sprint Race</strong> calculator is a strategy formula based on the race format, lap times, and fuel usage. Perfect for races with 0-2 pit stops.</p>
          </div>
          <div class="js-calc-type-desc-endurance">
            <p>The <strong>Endurance Race</strong> calculator is a more precise estimation for longer races with several pit stops. It takes extra parameters, but tries to account for niche factors that could impact the final lap and fuel counts.</p>
          </div>
        </div>

        <!-- sprint race calculator -->
        <form id="sprint-calc-form">

          <div class="form-floating mb-3">
            <select class="form-select" id="sprintRaceDistanceType">
              <option value="Hours" selected>Hours</option>
              <option value="Minutes">Minutes</option>
              <option value="Laps">Laps</option>
            </select>
            <label for="sprintRaceDistanceType">Race Distance Type</label>
          </div>

          <div class="form-floating mb-3">
            <input type="number" class="form-control" id="sprintRaceDistanceUnits" placeholder="">
            <label for="sprintRaceDistanceUnits">How Many {sprintRaceDistanceType} The Race?</label>
          </div>

          <div class="form-floating mb-3">
            <input type="text" class="form-control" id="sprintRaceLapTime" placeholder="">
            <label for="sprintRaceLapTime">Average Race Lap Time (format as MM:SS.MS)</label>
          </div>

          <div class="form-floating mb-3">
            <input type="number" class="form-control" id="sprintRaceFuelPerLap" placeholder="">
            <label for="sprintRaceFuelPerLap">Average Fuel Per Lap</label>
          </div>

          <div class="form-floating mb-3">
            <input type="number" class="form-control" id="sprintRaceFuelTankSize" placeholder="">
            <label for="sprintRaceFuelTankSize">Max Fuel Tank Size</label>
          </div>

          <div class="form-floating mb-3">
            <input type="number" class="form-control" id="sprintRaceFuelBufferLaps" placeholder="">
            <label for="sprintRaceFuelBufferLaps">How Many Laps of Extra Fuel Buffer?</label>
          </div>

          <div class="form-floating mb-3">
            <select class="form-select" id="sprintRacePaceLapFuel">
              <option value="0" selected>No</option>
              <option value="0.75">Yes - Add 75% of a lap extra fuel</option>
              <option value="0.50">Yes - Add 50% of a lap extra fuel</option>
              <option value="0.25">Yes - Add 25% of a lap extra fuel</option>
            </select>
            <label for="sprintRacePaceLapFuel">Is There A Pace Lap?</label>
          </div>



        </form>

      </div>

      <div class="col-12 col-lg-6">
        <h4>Calculation Results</h4>
        <p>Fill out all the inputs on the left to generate results</p>
      </div>
    </div>

  </div>

</main>

<?php include_once "php-inc/ft-footer.php"; ?>
