<?php
# Debug Mode Toggles
// ini_set('display_errors', 1);
// ini_set('display_startup_errors', 1);
// error_reporting(E_ALL);
?>

<!doctype html>
<html lang="en" data-bs-theme="dark">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>FormulaTroy
    <?php if ($pageTitle) {
      echo "| $pageTitle";
    } ?>
  </title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet"
    integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" crossorigin="anonymous">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.3/font/bootstrap-icons.css">
  <link rel="stylesheet" href="/css/formulatroy.css">
  <link rel="shortcut icon" type="image/x-icon" href="/img/favicon.ico"/>
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
              <a class="nav-link px-md-4 dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i class="bi bi-palette"></i> Themes</a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                <li><a class="dropdown-item" href="/gc-dark"><i class="bi bi-calendar3"></i> Google Calendar Dark Mode</a></li>
                <li><a class="dropdown-item disabled" href="#"><i class="bi bi-steam"></i> Steam Deck Theme (WIP)</a></li>
                <li><a class="dropdown-item disabled" href="#"><i class="bi bi-discord"></i> Discord Theme (WIP)</a></li>
              </ul>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link px-md-4 dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i class="bi bi-code-slash"></i> Web Apps</a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                <li><a class="dropdown-item" href="https://formulatroy.com/app/racing-calculator/" target="_blank"><i class="bi bi-fuel-pump"></i> Racing Fuel Calculator</a></li>
                <li><a class="dropdown-item" href="https://formulatroy.com/app/chess/" target="_blank"><i class="bi bi-box-arrow-up-right"></i> Chessboard</a></li>
                <li><a class="dropdown-item" href="https://formulatroy.com/app/canasta/" target="_blank"><i class="bi bi-suit-spade-fill"></i> Canasta Score Tracker</a></li>
              </ul>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link px-md-4 dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i class="bi bi-braces"></i> Scripts</a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                <li><a class="dropdown-item" href="/shutdown"><i class="bi bi-power"></i> Shutdown Macros</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
