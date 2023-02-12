<!doctype html>
<html lang="en" data-bs-theme="dark">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>FormulaTroy | Index</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet"
    integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" crossorigin="anonymous">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.3/font/bootstrap-icons.css">
  <link rel="stylesheet" href="css/formulatroy.css">
</head>

<body>
  <header>
    <nav class="navbar navbar-expand-lg navbar-dark bg-ftblack mt-2">
      <div class="container">
        <a class="navbar-brand" href="/">{Navbar Icon}</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
          <ul class="navbar-nav">
            <li class="nav-item ">
              <a class="nav-link px-md-4" aria-current="page" href="#">Home</a>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link px-md-4 dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button"
                data-bs-toggle="dropdown" aria-expanded="false">
                <i class="bi bi-palette"></i> Themes
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                <li><a class="dropdown-item" href="#"><i class="bi bi-calendar3"></i> Google Calendar Dark Mode</a></li>
                <li><a class="dropdown-item" href="#">Another action</a></li>
                <li><a class="dropdown-item" href="#">Something else here</a></li>
              </ul>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link px-md-4 dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button"
                data-bs-toggle="dropdown" aria-expanded="false">
                Web Apps
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                <li><a class="dropdown-item" href="#"><i class="bi bi-calendar3"></i> Test</a></li>
                <li><a class="dropdown-item" href="#">Another action</a></li>
                <li><a class="dropdown-item" href="#">Something else here</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
  <main>

    <!-- Hero -->
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

    <!-- Page -->
    <div class="container">

      <div class="row row-cols-1 row-cols-md-2 row-cols-xl-3 g-3">
        <div class="col">
          <div class="card shadow-sm">
            <svg class="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg"
              role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false">
              <title>Placeholder</title>
              <rect width="100%" height="100%" fill="#55595c"></rect><text x="50%" y="50%" fill="#eceeef"
                dy=".3em">Thumbnail</text>
            </svg>

            <div class="card-body">
              <h3 class="fw-light">Google Calendar Dark Mode</h3>
              <p class="fs-2"><i class="bi bi-filetype-css ft-css-badge"></i></p>
              <p class="card-text">Google Calendar's UI is so bright it I can see the floaters in my eyes. This
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

      </div>
    </div>

  </main>
  <footer class="mt-5">
    <div class="container">
      <p>Footer Text</p>
    </div>
  </footer>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"
    integrity="sha384-w76AqPfDkMBDXo30jS1Sgez6pr3x5MlQ1ZAGC+nuZB+EYdgRZgiwxhTBTkF7CXvN"
    crossorigin="anonymous"></script>
</body>

</html>
