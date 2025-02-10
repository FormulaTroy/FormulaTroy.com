$(document).ready(function () {

  //// NOTES
  // if driver wasn't found, default ranking: 1500
  // only compare a maximum of X drivers in either direction? prevents a fast driver from DNF'ing and boosting a ton of AMs?





  //// determine expected result ratio (Driver A's rating versus Driver B)
  // get both ELOs
  let driverRating = 1500;
  let opponentRating = 1500;

  // expected score magnification rate
  // for each 480 rating points of advantage over the opponent, the expected score
  // is magnified ten times in comparison to the opponent's expected score
  let expectedResultMagnification = 480;

  // determine the expectation of finishing ahead of the opponent
  // ratings are compared, and large differences in ratings are magnified
  // example: 1500 beating a 1200 is 80% ~ 1/(1+10^((1200 - 1500) / 480))
  // example: 1500 beating a 1450 is 56% ~ 1/(1+10^((1450 - 1500) / 480))
  // example: 1500 beating a 1900 is 13% ~ 1/(1+10^((1900 - 1500) / 480))
  // for simplicity, each driver comparison is done 1 by 1, my brain hurt enough doing the rest


  // ACTUALLY, probably need to do them all at the same time? Or the expected ratio would be changing as the loop continues
  let expectedResultRatio = 1 / 1 + Math.pow(10, (opponentRating - driverRating) / expectedResultMagnification);

  // set maximum possible rating adjustment per comparison
  // aka the "K-Factor" in the ELO equation
  //
  // Probation Periods
  //  0-20 Races: 40
  // 20-40 Races: 32
  //
  // '23-24 Results
  //  <2399: 25
  // >=2400: 15
  //
  // 2025+ Results (DECIDE RANGES ONCE HISTORICAL RESULTS ARE ADDED)
  // Copper (   0-1000): 30
  // Bronze (1000-1499): 25
  // Silver (1500-2399): 20
  //   Gold (2400-3000): 15
  //   Plat (3000+    ): 10
  let maxRatingAdjustment = 0;

  // use higher K-Factor during probation
  if (driverRaceCount < 20) {
    maxRatingAdjustment = 40;
  } else if (driverRaceCount < 40) {
    maxRatingAdjustment = 32;

    // after probation:
  } else {
    // implements historical result table '23-24
    if (maxRatingAdjustment >= 2400) {
      maxRatingAdjustment = 15
    } else {
      maxRatingAdjustment = 25
    }
  }

  // set result score (1 = finished ahead / win and 0 = finished behind / loss
  let resultRatio = 1;

  // calculate a rating adjustment based on the expectedResultRatio and resultRatio
  // where maxRatingAdjustment clamps the value
  let newDriverRating = driverRating + maxRatingAdjustment * (resultRatio - expectedResultRatio);



  let ratingChange = driverRating - newDriverRating;

});// end doc ready
