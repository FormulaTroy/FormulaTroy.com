<?php
$pageTitle = "Played Games";
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





        <table id="gamesPlayedTable"
          class="display table table-responsive table-borderless table-hover align-middle my-3">
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
<?php
# AddGame("Game Name", "Rating", "Date", "Hours", "Platform", "Comments/Awards", "Img Path")
# AddGame($name,       $rating,  $date,  $hours,  $platform,  $notes,            $imgPath);

#AddGame("Borderlands 3: Psycho Krieg and the Fantastic Fustercluck", "2", "2021", "3", "Epic", "", "https://images.igdb.com/igdb/image/upload/t_cover_big/co2g3k.jpg");

// 5.0 - 10
// 4.5 - 9
// 4.0 - 8
// 3.5 - 7
// 3.0 - 6
// 2.5 - 5
// 2.0 - 4
// 1.5 - 3
// 1.0 - 2


//AddGame("name", "#", "2001", "", "PC", "", "IMG");



// 2001
AddGame("Tony Hawk's Pro Skater 2", "7", "2001", "", "PC", "", "IMG");
AddGame("Star Wars: Episode I - Racer", "3", "2001", "", "PC", "", "IMG");
AddGame("Smuggler's Run", "6", "2001", "", "PS2", "", "IMG");
AddGame("LEGO Chess", "7", "2001", "", "PC", "", "IMG");
AddGame("Jak and Daxter: The Precursor Legacy", "10", "2001", "", "PS2", "", "https://images.igdb.com/igdb/image/upload/t_cover_big/co1w7q.jpg");
AddGame("Jackie Chan Adventures: Legend of the Dark Hand", "5", "2001", "", "GBA", "", "https://images.igdb.com/igdb/image/upload/t_cover_big/co4e84.jpg");
// 2000
AddGame("LEGO Stunt Rally", "3", "2000", "", "PC", "", "https://images.igdb.com/igdb/image/upload/t_cover_big/co2qk3.jpg");
AddGame("LEGO Rock Raiders", "6", "2000", "", "PC", "", "https://images.igdb.com/igdb/image/upload/t_cover_big/co3si0.jpg");
AddGame("LEGO Racers", "9", "2000", "", "PC", "", "https://images.igdb.com/igdb/image/upload/t_cover_big/co3whr.jpg");
AddGame("LEGO Island", "3", "2000", "", "PC", "", "https://images.igdb.com/igdb/image/upload/t_cover_big/co3hp5.jpg");
AddGame("LEGO Alpha Team", "5", "2000", "", "PC", "", "https://images.igdb.com/igdb/image/upload/t_cover_big/co1s1s.jpg");





















# End PHP
?>


          </tbody>
        </table>





      </div>
    </div>
  </div>

</main>

<?php include_once "../php-inc/ft-footer.php"; ?>

