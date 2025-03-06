<?php
$pageTitle = "CMS Driver Stratification";
include_once "../../php-inc/ft-functions.php";
include_once "../../php-inc/ft-header.php";
?>

<main>

  <?php
  CreateHeroText("<img src='img/cms-logo.png' alt=''> Driver Stratification", "License and driver ratings for Champion Motorsports rFactor 2");
  ?>

  <div class="container">

    <!-- page selector -->
    <div class="row">
      <div class="col text-center">
        <div class="btn-group" role="group">
          <input type="radio" class="btn-check" name="stratLicenseSelector" value="Modern" id="modernTab" autocomplete="off" checked>
          <label class="btn btn-outline-primary" for="modernTab"><i class="bi bi-person-vcard-fill"></i> Modern</label>

          <input type="radio" class="btn-check" name="stratLicenseSelector" value="Historic" id="historicTab" autocomplete="off">
          <label class="btn btn-outline-primary" for="historicTab"><i class="bi bi-h-circle-fill"></i> Historic</label>
        </div>
      </div>
    </div>

    <!-- elo rating distribution chart -->
    <div class="row mt-4">
      <div class="col-12 col-xl-8">
        <canvas id="ratingBarChart"></canvas>
      </div>
      <div class="col-12 col-xl-4">
        <p>The Champion Motorsports Driver Stratification analyzes official races and assigns Elo ratings to each driver.</p>
        <p>Drivers are also given a medal based on their rating. The license breakpoints are as follows:</p>
        <div id="js-license-breakpoint-display" class="row"></div>
        <p>If your flag is incorrect, please contact Troy Uyan on the CMS Discord Server.</p>
      </div>
    </div>

    <!-- stratification tables -->
    <div class="row mt-5">
      <div class="col">
        <table id="cms-strat-table" class="display nowrap table table-striped table-hover dataTable" style="width:100%"></table>
      </div>
    </div>

    <!-- modal window -->
    <div class="modal fade" id="driverModal" tabindex="-1">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h3 class="modal-title" id="driverModalLabel"></h3>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body" id="modalBody">
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>

</main>

<?php include_once "../../php-inc/ft-footer.php"; ?>
