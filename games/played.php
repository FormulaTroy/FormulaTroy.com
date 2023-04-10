<?php
$pageTitle = "Google Calendar Dark Mode";
include_once "../php-inc/ft-functions.php";
include_once "../php-inc/ft-header.php";
?>

<main>

  <?php
  # Hero
  CreateHeroText("Played Games Archive", "History of all my played games with ratings and hours");
  ?>

  <?php # Page ?>
  <div class="container">
    <div class="row g-3">
      <div class="col-12">






        <table id="gamesPlayedTable" class="display table table-borderless table-hover my-3">
          <thead>
            <tr>
              <th>Rating</th>
              <th>Art</th>
              <th>Game Title</th>
              <th>Platform</th>
              <th>Hours</th>
              <th>Completed</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><i class="bi bi-1-circle-fill">1</i></td>
              <td>{img}</td>
              <td>Game Name</td>
              <td>Steam</td>
              <td>15</td>
              <td>2015/05/01</td>
            </tr>

            <tr>
              <td><i class="bi bi-1-circle-fill">1</i></td>
              <td>{img}</td>
              <td>Game Name</td>
              <td>Steam</td>
              <td>15</td>
              <td>2015/05/01</td>
            </tr>




          </tbody>
        </table>





      </div>
    </div>
  </div>

</main>

<?php include_once "../php-inc/ft-footer.php"; ?>
