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




        <?php # AddGame("Game Name", "Rating", "Date", "Hours", "Platform", "Comments/Awards", "Img Path") ?>

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
# AddGame($name, $rating, $date, $hours, $platform, $notes, $imgPath);

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



AddGame("LEGO Stunt Rally", "3", "2000", "", "PC", "", "https://images.igdb.com/igdb/image/upload/t_cover_big/co2qk3.jpg");
AddGame("LEGO Rock Raiders", "6", "2000", "", "PC", "", "https://images.igdb.com/igdb/image/upload/t_cover_big/co3si0.jpg");
AddGame("LEGO Racers", "9", "2000", "", "PC", "", "https://images.igdb.com/igdb/image/upload/t_cover_big/co3whr.jpg");
AddGame("LEGO Island", "3", "2000", "", "PC", "", "https://images.igdb.com/igdb/image/upload/t_cover_big/co3hp5.jpg");
AddGame("LEGO Alpha Team", "5", "2000", "", "PC", "", "https://images.igdb.com/igdb/image/upload/t_cover_big/co1s1s.jpg");






















            ?>




            <!-- <tr>
              <td class="text-center" style="color:#ffcc66;"><i class="fs-1 bi bi-trophy-fill"></i><span class="d-none">10</span></td>
              <td><img src="https://images.igdb.com/igdb/image/upload/t_cover_big/co1lzy.png" alt="" height="100px"></td>
              <td><span class="fs-3">Astral Chain</span><br><span>2014 Rank 5</span></td>
              <td>Switch</td>
              <td>15</td>
              <td>2015/05/01</td>
            </tr>

            <tr>
              <td class="text-center" style="color:#66ff66;"><i class="fs-1 bi bi-9-square-fill"></i><span class="d-none">9</span></td>
              <td><img src="https://images.igdb.com/igdb/image/upload/t_cover_big/co1lzy.png" alt="" height="100px"></td>
              <td><span class="fs-3">Astral Chain</span><br></td>
              <td><span class="fs-2"><i class="bi bi-steam"></i></span><br>Steam Deck</td>
              <td>150</td>
              <td>2015/05/01</td>
            </tr>

            <tr>
              <td class="text-center" style="color:#0277d2;"><i class="fs-1 bi bi-8-circle-fill"></i><span class="d-none">8</span></td>
              <td><img src="https://images.igdb.com/igdb/image/upload/t_cover_big/co1lzy.png" alt="" height="100px"></td>
              <td><span class="fs-3">Astral Chain</span><br><span>2020 Game of the Year</span></td>
              <td>PlayStation 2</td>
              <td>15</td>
              <td>2015/05/01</td>
            </tr>

            <tr>
            <td class="text-center" style="color:#6e64ff;"><i class="fs-2 bi bi-7-square"></i><span class="d-none">7</span></td>
              <td><img src="https://images.igdb.com/igdb/image/upload/t_cover_big/co1lzy.png" alt="" height="100px"></td>
              <td><span class="fs-3">Astral Chain</span><br></td>
              <td>PlayStation 4</td>
              <td>5</td>
              <td>2015/05/01</td>
            </tr>

            <tr>
            <td class="text-center" style="color:#a64aab;"><i class="fs-2 bi bi-6-square"></i><span class="d-none">6</span></td>
              <td><img src="https://images.igdb.com/igdb/image/upload/t_cover_big/co1lzy.png" alt="" height="100px"></td>
              <td><span class="fs-3">Astral Chain</span><br></td>
              <td>Game Pass</td>
              <td>1</td>
              <td>2015/05/01</td>
            </tr>

            <tr>
              <td class="text-center" style="color:#b22a3e;"><i class="fs-2 bi bi-5-circle"></i><span class="d-none">5</span></td>
              <td><img src="https://images.igdb.com/igdb/image/upload/t_cover_big/co1lzy.png" alt="" height="100px"></td>
              <td><span class="fs-3">Astral Chain</span><br></td>
              <td>Game Pass</td>
              <td>1</td>
              <td>2015/05/01</td>
            </tr> -->




          </tbody>
        </table>





      </div>
    </div>
  </div>

</main>

<?php include_once "../php-inc/ft-footer.php"; ?>

