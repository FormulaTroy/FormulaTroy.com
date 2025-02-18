<?php
$pageTitle = "CMS Driver Stratification";
include_once "../../php-inc/ft-functions.php";
include_once "../../php-inc/ft-header.php";
?>

<main>

  <?php
  CreateHeroText("CMS Driver Stratification", "License and driver ratings for Champion Motorsports rFactor 2");
  ?>

  <div class="container">

    <!-- page selector -->
    <div class="row">
      <div class="col text-center">
        <div class="btn-group" role="group">
          <input type="radio" class="btn-check" name="calcType" value="modernTab" id="modernTab" autocomplete="off" checked>
          <label class="btn btn-outline-primary" for="modernTab"><i class="bi bi-person-vcard-fill"></i> Modern</label>

          <input type="radio" class="btn-check" name="calcType" value="historicTab" id="historicTab" autocomplete="off" disabled>
          <label class="btn btn-outline-secondary" for="historicTab"><i class="bi bi-h-circle-fill"></i> Historic</label>
        </div>
      </div>
    </div>









    <!-- elo rating distribution chart -->
    <div class="row mt-4">
      <div class="col-8">
        <canvas id="ratingBarChart"></canvas>
      </div>
      <div class="col-4">
        <p>Some intro text? This is an Elo rating, blah blah</p>
        <p>License breakpoints with medal display icons</p>
        <p>let platinumBreakpoint = 1130;</p>
        <p>let goldBreakpoint = 1030;</p>
        <p>let silverBreakpoint = 970;</p>
        <p>let bronzeBreakpoint = 920;</p>
        <p>If your flag is incorrect, please contact Troy Uyan on the CMS Discord Server.</p>
      </div>
    </div>

















    <!-- strat tables -->
    <div class="row mt-5">
      <div class="col">
        <table id="cms-strat-modern" class="display table table-striped table-hover dataTable" style="width:100%"></table>
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
