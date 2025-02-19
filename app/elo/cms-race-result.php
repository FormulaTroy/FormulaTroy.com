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
          <label for="driverRatingInput">Current Driver Rating JSON (Format: {"troy_uyan": {"name": "Troy Uyan","rating": [1000],"date": ["New Driver"]}} )</label>
          <textarea class="form-control" name="driverRatingInput" id="driverRatingInput" rows="3" placeholder=""></textarea>
          <button id="test-driverRatingInput" class="btn btn-outline-warning mt-2"><i class="bi bi-gear"></i> Fill Sample Starting Data</button>
        </div>

        <div id="raceResults-wrapper" class="mb-4">
          <label for="raceResultsInput">Race Results</label>
          <textarea class="form-control" name="raceResultsInput" id="raceResultsInput" rows="5" placeholder=""></textarea>
          <button id="calc-elo" class="btn btn-outline-primary mt-2"><i class="bi bi-flag-fill"></i> Calculate ELO Rating Changes</button>
          <button id="test-raceResultsInput" class="btn btn-outline-warning mt-2"><i class="bi bi-gear"></i> Fill Sample Starting Data</button>
        </div>
      </div>

      <div class="col col-md-12">
        <div id="driverRatingOutput-wrapper" class="mb-4">
          <label for="driverRatingOutput">Adjusted Final Driver Ratings</label>
          <textarea class="form-control" name="driverRatingOutput" id="driverRatingOutput" rows="9" placeholder=""></textarea>
          <button id="next-race" class="btn btn-outline-primary mt-2"><i class="bi bi-database-fill-check"></i> Use Results As New Input (Go To Next Race)</button>
          <button class="btn btn-outline-success mt-2"><i class="bi bi-database-fill-down"></i> Save Results As CSV</button>
        </div>
      </div>

    </div>
  </div>

</main>

<?php include_once "../../php-inc/ft-footer.php"; ?>
