<!doctype html>
<html lang="en" data-bs-theme="dark">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title><?php if ($pageTitle) {echo "$pageTitle | ";} ?>FormulaTroy</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.3/font/bootstrap-icons.css">
  <link rel="stylesheet" href="/css/formulatroy.css?v=2">
  <?php # add page-specific CSS
  if ($pageTitle == "CMS Driver Stratification") {
    echo '<link rel="stylesheet" href="/img/flag-icons/css/flag-icons.min.css">';
    echo '<link rel="stylesheet" href="https://cdn.datatables.net/2.2.2/css/dataTables.bootstrap5.css">';
  }
  ?>
  <link rel="shortcut icon" type="image/x-icon" href="/img/favicon.ico" />
</head>

<body>
  <header>
    <nav class="navbar navbar-expand-lg navbar-dark bg-ftblack mt-2 fs-4 fw-light">
      <div class="container">
        <a class="navbar-brand" href="/"><img src="/img/ft-logo-white-text.png" alt="FormulaTroy Logo"
            width="220px"></a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
          <ul class="navbar-nav">
            <li class="nav-item ">
              <a class="nav-link px-md-4" aria-current="page" href="/"><i class="bi bi-house-heart"></i> Index</a>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link px-md-4 dropdown-toggle" href="#" id="navbarDropdownMenuPrograms" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i class="bi bi-code-slash"></i> Programs</a>
              <ul class="dropdown-menu animate slideIn" aria-labelledby="navbarDropdownMenuPrograms">
                <li><a class="dropdown-item" href="/fuel"><i class="bi bi-fuel-pump"></i> Racing Fuel Calculator</a></li>
                <li><a class="dropdown-item" href="/app/elo/cms-stratification"><i class="bi bi-trophy-fill"></i> CMS Driver Stratification</a></li>
                <li><a class="dropdown-item" href="/shutdown"><i class="bi bi-power"></i> Shutdown Macros</a></li>
                <li><a class="dropdown-item" href="https://formulatroy.com/app/chess/" target="_blank"><i class="bi bi-box-arrow-up-right"></i> Chessboard</a></li>
                <li><a class="dropdown-item" href="https://formulatroy.com/app/canasta/" target="_blank"><i class="bi bi-suit-spade-fill"></i> Canasta Score Tracker</a></li>
                <!-- <li><a class="dropdown-item disabled" href="#"><i class="bi bi-controller"></i> Game Score Generator (WIP)</a></li> -->
              </ul>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link px-md-4 dropdown-toggle" href="#" id="navbarDropdownMenuThemes" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i class="bi bi-palette"></i> Themes</a>
              <ul class="dropdown-menu animate slideIn" aria-labelledby="navbarDropdownMenuThemes">
                <li><a class="dropdown-item" href="/discord"><i class="bi bi-discord"></i> Discord Themes</a></li>
                <li><a class="dropdown-item" href="/gd-dark"><i class="bi bi-file-earmark-text"></i> Google Docs Dark Mode</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
