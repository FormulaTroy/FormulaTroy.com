<footer class="mt-5 pt-3">
  <div class="container">
    <div class="row row-cols-1 row-cols-sm-3 g-3">
      <div class="col text-center social-links">
        <p>
          <a href="https://github.com/FormulaTroy" target="_blank"><i class="bi bi-github"></i> GitHub</a><br>
          <a href="https://www.backloggd.com/u/FormulaTroy/" target="_blank"><i class="bi bi-controller"></i> Backloggd</a><br>
          <!-- <a href="https://www.youtube.com/FormulaTroy" target="_blank"><i class="bi bi-youtube"></i> YouTube</a><br> -->
        </p>
      </div>
      <div class="col text-center">
        <p class="fs-5 mb-0">Made with <i class="bi bi-heart-fill"></i></p>
        <p mt-0>JavaScript helps too</p>
      </div>
      <div class="col text-center">
        <p>
          <span class="fs-5">FormulaTroy</span><br>
          &copy; 2022-<?php echo date("Y"); ?> <i class="bi bi-code-slash"></i>
        </p>
      </div>
      <p>&nbsp;</p>
    </div>
  </div>
</footer>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
<script src="https://code.jquery.com/jquery-3.6.4.min.js" integrity="sha256-oP6HI9z1XaZNBrJURtCoUT5SUnxFr8s3BzRl+cbzUq8=" crossorigin="anonymous"></script>
<script src="/js/formulatroy.min.js"></script>

<?php
# add page-specific JS
if ($pageTitle == "Sim Racing Fuel Calculator") {
  echo "<script src=\"/js/simracingfuelcalc.js\"></script>";
} elseif ($pageTitle == "CMS Driver Stratification") {
  $timestamp = time();
  echo '<script src="https://cdn.datatables.net/2.2.2/js/dataTables.js"></script>';
  echo '<script src="https://cdn.datatables.net/2.2.2/js/dataTables.bootstrap5.js"></script>';
  echo '<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>';
  echo "<script src=\"/app/elo/js/cms-stratification-tables.js?v=" . $timestamp . "\"></script>";
} elseif ($pageTitle == "CMS Race Result ELO") {
  $timestamp = time();
  echo "<script src=\"/app/elo/js/cms-race-result-elo.js?v=" . $timestamp . "\"></script>";
}
?>

</body>

</html>
