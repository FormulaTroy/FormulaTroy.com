$(document).ready(function () {

  // testing functions
  $("#test-driverRatingInput").on("click", function () {
    $("#driverRatingInput").val("");
    $("#driverRatingInput").val("Troy Uyan, us, 1450, 90, 200, -14, 2/8/2025\nJohn Smith, ca, 1390, 5, 0, 24, 2/1/2025\nMark Webber, au, 2100, 80, 100, -2, 1/15/2025");
  });
  $("#test-raceResultsInput").on("click", function () {
    $("#raceResultsInput").val("");
    $("#raceResultsInput").val("RACE DATE: 3/1/2025\nRESULT: HYPERCAR\nNew Guy\nTroy Uyan\nMark Webber\nJohn Smith\nNew AM Guy");
  });

  // helper: add new driver to drivers array with defaults
  function addNewDriver(driverName) {
    let newDriver = {
      name: driverName,
      flag: "us",
      rating: 1500,
      races: 0,
      champBonuses: 0,
      lastChangedValue: 0,
      lastChangedDate: "1/1/1970"
    };
    drivers.push(newDriver);
  }

  // helper: find driver object in drivers array by name string
  function findDriverByName(driverName) {
    // loop over the drivers array, and compare each name prop to the provided string
    for (let i = 0; i < drivers.length; i++) {
      if (drivers[i].name === driverName) {
        return drivers[i];
      }
    }

    // if driver was not found, add new driver, and return it
    addNewDriver(driverName);
    return drivers[drivers.length - 1]
  }

  // helper: compare driver and opponent ratings to get expected result as a %
  function addExpectedResultELO(driverRating, opponentRating, expectedResultsForRace) {
    // expected score magnification rate
    // for each 480 rating points of advantage over the opponent, the expected score
    // is magnified ten times in comparison to the opponent's expected score
    let expectedResultMagnification = 480;

    // determine the expectation of finishing ahead of the opponent
    // ratings are compared, and large differences in ratings are magnified
    // example: 1500 beating a 1200 is 80% ~ 1/(1+10^((1200 - 1500) / 480))
    // example: 1500 beating a 1450 is 56% ~ 1/(1+10^((1450 - 1500) / 480))
    // example: 1500 beating a 1900 is 13% ~ 1/(1+10^((1900 - 1500) / 480))
    let expectedResult = 1 / (1 + Math.pow(10, (opponentRating - driverRating) / expectedResultMagnification));
    //console.log(driverRating + " vs " + opponentRating + " = " + expectedResult);

    // add expectedResult vs this particular opponent to expectedResultsForRace
    expectedResultsForRace.push(expectedResult);
  }

  function updateDriverRatingELO(driver, expectedResultsForRace, actualResultsForRace) {
    // set maximum possible rating adjustment per 1:1 driver comparison
    // aka the "K-Factor" in the ELO equation
    //
    // Probation Periods
    //  0-20 Races: 40
    // 20-40 Races: 35
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
    if (driver.races < 20) {
      maxRatingAdjustment = 40;
    } else if (driver.races < 40) {
      maxRatingAdjustment = 35;

      // after probation:
    } else {
      // implements historical result table '23-24
      if (driver.rating >= 2400) {
        maxRatingAdjustment = 15
      } else {
        maxRatingAdjustment = 25
      }
    }

    console.log(maxRatingAdjustment)

    // total the expected and actual scores
    let expectedResultScore = 0;
    for (let i = 0; i < expectedResultsForRace.length; i++) {
      expectedResultScore += expectedResultsForRace[i];
    }

    let actualResultScore = 0;
    for (let i = 0; i < actualResultsForRace.length; i++) {
      actualResultScore += actualResultsForRace[i];
    }

    console.log(expectedResultScore);
    console.log(actualResultScore);

    // calculate a rating adjustment based on the expectedResult and actualResult
    // where maxRatingAdjustment clamps the value per matchup, but not per race
    let newDriverRating = driver.rating + maxRatingAdjustment * (actualResultScore - expectedResultScore);
    newDriverRating = Math.round(newDriverRating);

    // get the before/after delta for this race
    let ratingChange = newDriverRating - driver.rating;
  }

  // trigger: calculate the elo changes based on current ratings and new race result
  $("#calc-elo").on("click", function () {

    // get current ratings and new results
    let driverRatingInput = $("#driverRatingInput").val();
    let raceResultsInput = $("#raceResultsInput").val();
    //console.log(driverRatingInput);
    //console.log(raceResultsInput);

    if (driverRatingInput != "" && raceResultsInput != "") {
      // make an array of drivers as objects
      let driverRatingInputLines = driverRatingInput.split('\n');
      drivers = []; // global var

      $.each(driverRatingInputLines, function (index, line) {
        if (line.trim() !== "") { // Skip empty lines
          const values = line.split(',');
          if (values.length === 7) { // Ensure all 7 values are present
            const driver = {
              name: values[0].trim(),
              flag: values[1].trim(),
              rating: parseInt(values[2].trim()),
              races: parseInt(values[3].trim()),
              champBonuses: parseInt(values[4].trim()),
              lastChangedValue: parseInt(values[5].trim()),
              lastChangedDate: values[6].trim()
            };
            drivers.push(driver);
          } else {
            console.error("Invalid data format on line:", line);
          }
        }
      });
      //console.log(drivers);

      // make sure the results are in the right format
      raceResultsLines = raceResultsInput.split('\n');
      if (raceResultsLines.length < 4) { // need at least 4 raceResultsLines (date, result, 2 drivers)
        alert("Invalid race results format: Not enough raceResultsLines...");
        return false;
      }

      const raceDateLine = raceResultsLines[0].trim();
      const resultLine = raceResultsLines[1].trim();

      if (!raceDateLine.startsWith("RACE DATE:") || !resultLine.startsWith("RESULT")) {
        alert("Invalid race results format: First two lines incorrect.");
        return false;
      }

      const raceDate = raceDateLine.substring("RACE DATE:".length).trim();
      //console.log(raceDate);

    } else {
      alert("driverRatingInput and raceResults need to be filled in");
      return false;
    }

    // with the drivers array and valid results text, start parsing the results
    const raceResults = raceResultsLines.slice(2); // get the driver lines only out of the race results
    console.log(raceResults);

    //// multi-dimensional loop starts here ////
    // loop over the results, driver by driver
    $.each(raceResults, function (index, driverLine) {

      // the current position's driver
      const driverName = driverLine.trim();
      if (driverName !== "") {
        currentDriver = findDriverByName(driverName);
      } else {
        alert("empty driver? at position: " + index)
        return false;
      }

      // since the results loop is sequential, start by assuming you lost to the first driver
      beatOpponent = 0
      // reset the storage array for comparisons
      expectedResultsForRace = [];
      actualResultsForRace = [];

      // start looping the results again to compare the current driver to every other driver
      $.each(raceResults, function (compareIndex, driverLine) {

        // the comparison position's driver
        const opponentDriverName = driverLine.trim();

        if (opponentDriverName == driverName) {

          // skip comparing to self, but now it means everyone after you won against
          beatOpponent = 1;

        } else if (opponentDriverName !== "") {

          // get opponent driver's data
          let opponentDriver = findDriverByName(opponentDriverName);

          // add elo rating comparison to expectedResultsForRace, and actual result to actualResultsForRace
          addExpectedResultELO(currentDriver.rating, opponentDriver.rating, expectedResultsForRace)
          actualResultsForRace.push(beatOpponent);

        } else {
          alert("empty driver? at position: " + compareIndex)
          return false;
        }


      });// end looping over results for comparison

      // now we have all expected (%) and actual (0 || 1) results
      // make sure they are the same length
      if (expectedResultsForRace.length == actualResultsForRace.length) {

        updateDriverRatingELO(currentDriver, expectedResultsForRace, actualResultsForRace)

      } else {
        alert("expected and actual result arrays were different lengths, see console for values");
        console.log(expectedResultsForRace);
        console.log(actualResultsForRace);
        return false;
      }





      // add results to adjusted final driver ratings textbox, but not back to drivers array









    });// end looping over results






  });// end $("#calc-elo").on("click"...







});// end doc ready
