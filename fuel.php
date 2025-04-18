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
          <input type="radio" class="btn-check" name="calcType" value="calcShorthand" id="calcShorthand" autocomplete="off">
          <label class="btn btn-outline-primary" for="calcShorthand">Shorthand</label>

          <input type="radio" class="btn-check" name="calcType" value="calcSprint" id="calcSprint" autocomplete="off" checked>
          <label class="btn btn-outline-primary" for="calcSprint">Sprint Race</label>

          <input type="radio" class="btn-check" name="calcType" value="calcEndurance" id="calcEndurance" autocomplete="off" disabled>
          <label class="btn btn-outline-secondary" for="calcEndurance">Endurance Race</label>
        </div>
      </div>
    </div>

    <!-- calculator inputs and results wrapper -->
    <div class="row mt-5">
      <div class="col-12 col-lg-6">

        <!-- calculator type and description -->
        <h4 id="js-calc-type-header">Sprint Race Calculator</h4>
        <div id="js-calc-type-desc-wrapper">
          <div id="js-calc-type-desc-shorthand" style="display: none;">
            <p>The <strong>Shorthand</strong> calculator is a quick estimation formula for timed races with a single text box as the input. It does not offer many options.</p>
          </div>
          <div id="js-calc-type-desc-sprint">
            <p>The <strong>Sprint Race</strong> calculator is a strategy formula based on the race format, lap times, and fuel usage.</p>
          </div>
          <div id="js-calc-type-desc-endurance" style="display: none;">
            <p>The <strong>Endurance Race</strong> calculator is a more precise estimation for longer races with several pit stops. It takes extra parameters, but tries to account for niche factors that could impact the final lap and fuel counts.</p>
          </div>
        </div>

        <!-- calculator inputs -->
        <form id="fuel-calc-form">

          <div class="form-floating mb-3" id="shorthandInputWrapper" style="display: none;">
            <input type="text" class="form-control" id="shorthandInput" placeholder="">
            <label for="shorthandInput">RaceMinutes LapTime FuelPerLap FuelTankSize AdditionalLaps</label>
          </div>

          <div class="form-floating mb-3" id="raceDistanceTypeWrapper">
            <select class="form-select" id="raceDistanceType">
              <option value="Hours" selected>Hours</option>
              <option value="Minutes">Minutes</option>
              <option value="Laps">Laps</option>
            </select>
            <label for="raceDistanceType"><i class="bi bi-flag-fill"></i> Race Distance Type</label>
          </div>

          <div class="form-floating mb-3" id="raceDistanceUnitsWrapper">
            <input type="number" class="form-control" id="raceDistanceUnits" min="0" placeholder="">
            <label for="raceDistanceUnits"><i class="bi bi-clock-history"></i> How Many Hours Is The Race?</label>
          </div>

          <div class="form-floating mb-3" id="raceLapTimeWrapper">
            <input type="text" class="form-control" id="raceLapTime" placeholder="">
            <label for="raceLapTime"><i class="bi bi-stopwatch"></i> Average Race Lap Time (format as MM:SS.MS)</label>
          </div>

          <div class="form-floating mb-3" id="raceFuelPerLapWrapper">
            <input type="number" class="form-control" id="raceFuelPerLap" min="0" placeholder="">
            <label for="raceFuelPerLap"><i class="bi bi-fuel-pump"></i> Average Fuel Per Lap</label>
          </div>

          <div class="form-floating mb-3" id="raceFuelTankSizeWrapper">
            <input type="number" class="form-control" id="raceFuelTankSize" min="0" placeholder="">
            <label for="raceFuelTankSize"><i class="bi bi-fuel-pump"></i> Max Fuel Tank Size</label>
          </div>

          <div class="form-floating mb-3" id="raceFuelReserveLapsWrapper">
            <input type="number" class="form-control" id="raceFuelReserveLaps" min="0" value="1" placeholder="">
            <label for="raceFuelReserveLaps"><i class="bi bi-node-plus-fill"></i> How Many Laps of Extra Fuel Reserve?</label>
          </div>

          <div class="form-floating mb-3" id="racePaceLapFuelWrapper">
            <select class="form-select" id="racePaceLapFuel">
              <option value="0" selected>No</option>
              <option value="0.75">Yes - Add 75% of a lap extra fuel</option>
              <option value="0.50">Yes - Add 50% of a lap extra fuel</option>
              <option value="0.25">Yes - Add 25% of a lap extra fuel</option>
            </select>
            <label for="racePaceLapFuel"><i class="bi bi-taxi-front-fill"></i> Is There A Pace Lap?</label>
          </div>

          <div class="form-floating mb-3" id="pitstopDeltaWrapper" style="display: none;">
            <input type="number" class="form-control" id="pitstopDelta" min="0" value="45" placeholder="">
            <label for="pitstopDelta"><i class="bi bi-stopwatch"></i> Pitstop Delta (in seconds)</label>
          </div>

          <div class="form-floating mb-3" id="fuelLeftAtPitstopWrapper" style="display: none;">
            <input type="number" class="form-control" id="fuelLeftAtPitstop" min="0" placeholder="">
            <label for="fuelLeftAtPitstop">Remaining Fuel In Tank At Pitstop</label>
          </div>

        </form>
      </div>

      <!-- calculator results -->
      <div class="col-12 col-lg-6">
        <h4>Strategy Results</h4>
        <div id="results"></div>
      </div>

    </div>
  </div>

</main>

<?php include_once "php-inc/ft-footer.php"; ?>
