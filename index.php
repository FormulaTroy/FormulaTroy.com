<?php include_once "php-inc/ft-header.php"; ?>

<main>

  <?php # Hero ?>
  <section class="py-3 text-center container">
    <div class="row py-lg-3">
      <div class="col-lg-6 col-md-8 mx-auto">
        <h1 class="fw-light">FormulaTroy Project Index</h1>
        <p class="lead text-muted">
          Everything is open source and free to be used or copied.
        </p>
      </div>
    </div>
  </section>

  <?php # Page ?>
  <div class="container">

    <div class="row row-cols-1 row-cols-md-2 row-cols-xl-3 g-3">

      <div class="col">
        <div class="card shadow-sm">
          <img src="img/projects/ftgcdm.png" alt="">
          <div class="card-body">
            <h3 class="fw-light">Google Calendar Dark Mode</h3>
            <p class="fs-2"><i class="bi bi-filetype-css ft-css-badge"></i></p>
            <p class="card-text">Google Calendar's UI is so bright I can see the floaters in my eyes. This
              stylesheet adds Dark Mode to Google Calendar.</p>
            <div class="d-flex justify-content-between align-items-center">
              <div class="btn-group">
                <button type="button" class="btn btn-primary"><i class="bi bi-calendar3"></i> Project Page</button>
                <button type="button" class="btn btn-outline-secondary"><i class="bi bi-github"></i> Code</button>
              </div>
              <small class="text-muted"><i class="bi bi-code-slash"></i> 2023</small>
            </div>
          </div>
        </div>
      </div>

      <div class="col">
        <div class="card shadow-sm">
          <a href="#"><img src="img/projects/racingcalc.png" alt=""></a>
          <div class="card-body">
            <h3 class="fw-light">Racing Fuel Calculator</h3>

            <p class="fs-2"><i class="bi bi-filetype-css ft-css-badge"></i></p>
            <div class="d-flex justify-content-between align-items-center">
              <div class="btn-group">
                <a class="btn btn-primary" href="#" role="button"><i class="bi bi-fuel-pump"></i> Launch App</a>
                <a class="btn btn-outline-secondary" href="#" role="button"><i class="bi bi-github"></i> Code</a>
              </div>
              <small class="text-muted"><i class="bi bi-code-slash"></i> 2016</small>
            </div>
            <p class="card-text pt-3">Sim Racing fuel calculator! The calculator will tell you how much fuel you need to
              put in the tank as well as if and/or how many fuel stops you need.</p>
          </div>
        </div>
      </div>

      <div class="col">
        <div class="card shadow-sm">
          <img src="img/projects/chess.png" alt="">
          <div class="card-body">
            <h3 class="fw-light">Chessboard</h3>
            <p class="fs-2"><i class="bi bi-filetype-css ft-css-badge"></i></p>
            <p class="card-text">Just a simple online chessboard to play locally that doesn't require you to sign up or
              display ads.</p>
            <div class="d-flex justify-content-between align-items-center">
              <div class="btn-group">
                <button type="button" class="btn btn-primary"><i class="bi bi-box-arrow-up-right"></i> Launch
                  App</button>
                <button type="button" class="btn btn-outline-secondary"><i class="bi bi-github"></i> Code</button>
              </div>
              <small class="text-muted"><i class="bi bi-code-slash"></i> 2015</small>
            </div>
          </div>
        </div>
      </div>

      <div class="col">
        <div class="card shadow-sm">
          <img src="img/projects/canasta.png" alt="">
          <div class="card-body">
            <h3 class="fw-light">Canasta Score Tracker</h3>
            <p class="fs-2"><i class="bi bi-filetype-css ft-css-badge"></i></p>
            <p class="card-text">Canasta card game score tracker and round results calculator.</p>
            <div class="d-flex justify-content-between align-items-center">
              <div class="btn-group">
                <button type="button" class="btn btn-primary"><i class="bi bi-suit-spade-fill"></i> Launch App</button>
                <button type="button" class="btn btn-outline-secondary"><i class="bi bi-github"></i> Code</button>
              </div>
              <small class="text-muted"><i class="bi bi-code-slash"></i> 2014</small>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>

</main>

<?php include_once "php-inc/ft-footer.php"; ?>
