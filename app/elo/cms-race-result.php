<?php
$pageTitle = "CMS Race Result ELO";
include_once "../../php-inc/ft-functions.php";
include_once "../../php-inc/ft-header.php";
?>

<main>

  <?php
  CreateHeroText("CMS Race Result ELO", "Driver rating calculator for Champion Motorsports race results");
  ?>

  <div class="container">
    <div class="row mt-3">

      <div class="col col-md-12">

        <div id="driverRatingInput-wrapper" class="mb-4">
          <label for="driverRatingInput">Current Driver Rating CSV Table (Format: Driver, Flag, Rating, Races, Champ Bonuses, Last Changed Value, Last Changed Date)</label>
          <textarea class="form-control" name="driverRatingInput" id="driverRatingInput" rows="3" placeholder="Troy Uyan, us, 1450, 90, 200, -14, 2/8/2025"></textarea>
        </div>

        <div id="raceResults-wrapper" class="mb-4">
          <label for="raceResults">Race Results</label>
          <textarea class="form-control" name="raceResults" id="raceResults" rows="5" placeholder="RACE DATE: 2/8/2025&#10;RESULT: HYPERCAR&#10;Troy Uyan&#10;John Smith"></textarea>
          <button class="btn btn-outline-primary mt-2"><i class="bi bi-flag-fill"></i> Calculate ELO Rating Changes</button>
        </div>
      </div>

      <div class="col col-md-6">
        <div id="driverRatingDeltas-wrapper" class="mb-4">
          <label for="driverRatingDeltas">Rating Adjustments</label>
          <textarea class="form-control" name="driverRatingDeltas" id="driverRatingDeltas" rows="3" placeholder="Troy Uyan: +50&#10;John Smith: -125"></textarea>
          <button class="btn btn-outline-primary mt-2"><i class="bi bi-sort-alpha-down"></i> Alphabetize</button>
        </div>
      </div>

      <div class="col col-md-6">
        <div id="driverLicenseChanges" class="mb-4">
          <label for="driverLicenseChanges">License Changes</label>
          <textarea class="form-control" name="driverLicenseChanges" id="driverLicenseChanges" rows="3" placeholder="Troy Uyan, Promotion, Gold -> Platinum&#10;John Smith, Relegation, Gold -> Silver"></textarea>
        </div>
      </div>

      <div class="col col-md-12">
        <div id="driverRatingOutput-wrapper" class="mb-4">
          <label for="driverRatingOutput">Adjusted Final Driver Ratings</label>
          <textarea class="form-control" name="driverRatingOutput" id="driverRatingOutput" rows="9" placeholder="Troy Uyan, us, 1500, 91, 200, 50, 2/24/2025"></textarea>
          <button class="btn btn-outline-primary mt-2"><i class="bi bi-database-fill-check"></i> Use Results As New Input (Go To Next Race)</button>
          <button class="btn btn-outline-success mt-2"><i class="bi bi-database-fill-down"></i> Save Results As CSV</button>
        </div>
      </div>

    </div>
  </div>

</main>

<?php include_once "../../php-inc/ft-footer.php"; ?>
