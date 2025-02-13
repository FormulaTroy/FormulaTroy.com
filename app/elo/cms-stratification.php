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
          <label class="btn btn-outline-primary" for="modernTab"><i class="bi bi-person-vcard-fill"></i> Modern Licenses</label>

          <input type="radio" class="btn-check" name="calcType" value="historicTab" id="historicTab" autocomplete="off" disabled>
          <label class="btn btn-outline-secondary" for="historicTab"><i class="bi bi-h-circle-fill"></i> Historic Licenses</label>
        </div>
      </div>
    </div>

    <!-- content -->
    <div class="row mt-5">
      <p>If your flag is incorrect or you have any questions, please contact Troy Uyan on the CMS Discord Server.</p>
    </div>
  </div>

</main>

<?php include_once "../../php-inc/ft-footer.php"; ?>
