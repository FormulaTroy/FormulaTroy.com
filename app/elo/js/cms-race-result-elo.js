$(document).ready(function () {

  // helper: add new driver to drivers json with defaults
  function addNewDriver(driverName) {

    let driverMachineName = getDriverMachineName(driverName);

    let defaultELO = 1000;

    let newDriver = {
      [driverMachineName]: {
        "name": driverName,
        "races": 0,
        "rating": [defaultELO],
        "date": ["Start"],
        "finishPos": [0],
        "totalCars": [0],
        "avgFinishPos": 0,
        "active": 0
      }
    };

    // make a separate object to put in the post-race json, breaks the memory reference
    // caused by using the same var in both jsons. And keeps the new driver's rating from
    // changing beyond the default when mid-race result calculations are happening
    let newPostRaceDriver = {
      [driverMachineName]: {
        "name": driverName,
        "races": 0,
        "rating": [defaultELO],
        "date": ["Start"],
        "finishPos": [0],
        "totalCars": [0],
        "avgFinishPos": 0,
        "active": 0
      }
    };

    // extend the existing json structures with new driver
    $.extend(drivers, newDriver);
    $.extend(postRaceDrivers, newPostRaceDriver);
    // console.log("Added new driver: " + drivers[driverMachineName].name);
  }

  // helper: convert driver name to machine name
  function getDriverMachineName(driverName) {
    return driverName.toLowerCase().replace(/\s+/g, '_');
  }

  // helper: find driver object in drivers json by name string
  function findDriverByName(driverName) {

    let driverMachineName = getDriverMachineName(driverName);

    // console.log(driverMachineName);

    foundDriver = drivers[driverMachineName];

    // console.log(foundDriver);

    // if we got data back, return it, else create a new driver and return that
    if (foundDriver != null) {
      // console.log("Found existing driver: "+driverName)
      return foundDriver;
    } else {
      addNewDriver(driverName);
      return drivers[driverMachineName];
    }
  }

  // helper: clone the drivers array[object->prop] structure to a new variable
  function createPostRaceDrivers(drivers) {
    postRaceDrivers = structuredClone(drivers); // deep copy, includes nested objects
  }

  // helper: when doing multiple results at the same time,
  // have the resulting ratings DB of one race be the starting driver DB for the next
  function overwritePreRaceDriversWithNewResult(postRaceDrivers) {
    drivers = structuredClone(postRaceDrivers);
  }

  // helper: find driver object in postRaceDrivers json by name string
  function findPostRaceDriverByName(driverName) {
    let driverMachineName = getDriverMachineName(driverName);
    foundDriver = postRaceDrivers[driverMachineName];

    // if we got data back, return it, else create a new driver and return that
    if (foundDriver != null) {
      return foundDriver;
    } else {
      addNewDriver(driverName);
      return postRaceDrivers[driverMachineName];
    }
  }

  // helper: split results input into multiple race results by splitting on "RACE DATE" line
  function parseRaceResultsInputIntoRaces(raceResultsInput) {
    // split by "RACE DATE" text
    // ["", "RACE DATE: 2023/01/19", "RESULT: ...", "RACE DATE: 2023/01/20", "RESULT: ...", ""]
    const raceBlocks = raceResultsInput.split(/(RACE DATE: \d{4}\/\d{2}\/\d{2})/);

    const results = [];

    // loop 2 iterations at a time to get each race result block from the split array above
    for (let i = 1; i < raceBlocks.length; i += 2) {
      const date = raceBlocks[i].trim();
      const resultBlock = raceBlocks[i + 1].trim();

      // regex for extracting category and drivers
      const categoryMatch = resultBlock.match(/RESULT: (.+?) =============\n/);
      if (categoryMatch) {
        const category = categoryMatch[1].trim();
        const drivers = resultBlock.split("=============\n")[1].trim().split("\n").map(driver => driver.trim()).filter(driver => driver !== "");

        // add to results array as a race result object
        results.push({ date: date, category: category, drivers: drivers });
      }
    }
    return results;
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

  // helper: compare expected and actual results and calculate rating adjustment
  function updateDriverRatingELO(driver, expectedResultsForRace, actualResultsForRace) {

    // set maximum possible rating adjustment per 1:1 driver comparison
    // aka the "K-Factor" in the ELO equation
    let maxRatingAdjustment = 2;

    // total the expected and actual scores
    let expectedResultScore = 0;
    for (let i = 0; i < expectedResultsForRace.length; i++) {
      expectedResultScore += expectedResultsForRace[i];
    }

    let actualResultScore = 0;
    for (let i = 0; i < actualResultsForRace.length; i++) {
      actualResultScore += actualResultsForRace[i];
    }

    // calculate a rating adjustment based on the expectedResult and actualResult
    // where maxRatingAdjustment clamps the value per matchup, but not per race
    let newDriverRating = driver.rating[driver.rating.length - 1] + maxRatingAdjustment * (actualResultScore - expectedResultScore);
    newDriverRating = Math.round(newDriverRating);

    // use the new driver rating to populate the post-race driver object with new stuffs
    postRaceDriverObj = findPostRaceDriverByName(driver.name.toString());
    postRaceDriverObj.races = postRaceDriverObj.races + 1;
    postRaceDriverObj.rating.push(newDriverRating);
    postRaceDriverObj.date.push(raceDate);
  }



  // trigger: calculate the elo changes based on current ratings and new race result
  $("#calc-elo").on("click", function () {

    // get current ratings and new results
    let driverRatingInput = $("#driverRatingInput").val();
    // console.log(driverRatingInput);
    let raceResultsInput = $("#raceResultsInput").val();
    //console.log(driverRatingInput);
    //console.log(raceResultsInput);

    // global date object for comparing to 3 months ago
    let threeMonthsAgoDateObj = new Date();
    threeMonthsAgoDateObj.setMonth(threeMonthsAgoDateObj.getMonth() - 3);

    if (driverRatingInput != "" && raceResultsInput != "") {

      // load the input driver json / objects
      drivers = JSON.parse(driverRatingInput); // global var

      // copy the driver objects for use in post-race results later
      createPostRaceDrivers(drivers);

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

    } else {
      alert("driverRatingInput and raceResults need to be filled in");
      return false;
    }

    // with the drivers array and valid results text, start parsing the results
    // split the input into each race and into each class
    let individualRaceResults = parseRaceResultsInputIntoRaces(raceResultsInput);

    // sort the race results by race date
    individualRaceResults.sort(function (a, b) {
      if (a.date < b.date) {
        return -1; // a comes before b
      }
      if (a.date > b.date) {
        return 1; // a comes after b
      }
      return 0; // same date string
    });

    console.log(individualRaceResults);

    //// multi-dimensional loop starts here ////
    /// LOOP 1: CLASS RESULTS                ///
    /// LOOP 2: DRIVERS                      ///
    /// LOOP 3: DRIVER VS OTHER DRIVERS      ///

    // loop over each race->class result
    $.each(individualRaceResults, function (index, resultBlock) {

      const raceResults = resultBlock.drivers;
      const driversInClass = resultBlock.drivers.length;
      raceDate = resultBlock.date;
      raceDate = raceDate.substring(raceDate.lastIndexOf(":") + 2);



      // store the number of drivers in this class result

      // use the loop index to place the position array






      // loop over the results, driver by driver
      $.each(raceResults, function (index, driverLine) {

        // the current position's driver
        const driverName = driverLine.trim();

        if (driverName !== "") {
          // console.log("Looking for Driver: " + driverName)
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

        // console.log(currentDriver);

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

            let currentDriverRating = currentDriver.rating[currentDriver.rating.length - 1];
            let opponentDriverRating = opponentDriver.rating[opponentDriver.rating.length - 1];

            // console.log("ratings returned: "+currentDriverRating+" and "+opponentDriverRating);

            // add elo rating comparison to expectedResultsForRace, and actual result to actualResultsForRace
            addExpectedResultELO(currentDriverRating, opponentDriverRating, expectedResultsForRace);
            actualResultsForRace.push(beatOpponent);

          } else {
            alert("empty driver? at position: " + compareIndex)
            return false;
          }

        });// end looping over results again for comparison

        // now we have all expected (%) and actual (0 || 1) results
        // make sure they are the same length
        if (expectedResultsForRace.length == actualResultsForRace.length) {

          // calc ELO rating adjustment for this driver
          updateDriverRatingELO(currentDriver, expectedResultsForRace, actualResultsForRace)

        } else {
          alert("expected and actual result arrays were different lengths, see console for values");
          console.log(expectedResultsForRace);
          console.log(actualResultsForRace);
          return false;
        }

        // add the finish position data for this driver on this race
        let postRaceDriverObj = findPostRaceDriverByName(currentDriver.name.toString());
        postRaceDriverObj.finishPos.push(index + 1);
        postRaceDriverObj.totalCars.push(driversInClass);

      });// end looping over results

      // turn the resulting postRaceDrivers DB into the new Drivers DB
      // (so the second next races uses the new ratings for the first race, and so on)
      overwritePreRaceDriversWithNewResult(postRaceDrivers);

    });// end loop over each race->class result

    // after the multi-dimensional result parsing loops are done
    // calculate additional properties on each driver object
    // this effectively caches the results so the front end is faster later
    $.each(postRaceDrivers, function (index, postRaceDriver) {

      // determine average finishing position
      // start the loop from i1 to skip the first placeholder element
      let sumOfFinishingPositions = 0;
      let raceCount = 0;
      for (let i = 1; i < postRaceDriver.finishPos.length; i++) {
        sumOfFinishingPositions += postRaceDriver.finishPos[i];
        raceCount++;
      }
      postRaceDriver.avgFinishPos = (sumOfFinishingPositions / raceCount).toFixed(1);

      // determine if the driver is considered active
      const lastRaceDateParts = postRaceDriver.date[postRaceDriver.date.length - 1].split('/');
      if (lastRaceDateParts.length !== 3) {
        console.error("Invalid last changed date format; Expected YYYY/MM/DD.");
        console.log(lastRaceDateParts);
        return false;
      }

      const lastRaceYear = parseInt(lastRaceDateParts[0], 10);
      const lastRaceMonth = parseInt(lastRaceDateParts[1], 10) - 1; // Date() month is 0-indexed, subtract 1
      const lastRaceDay = parseInt(lastRaceDateParts[2], 10);
      if (isNaN(lastRaceYear) || isNaN(lastRaceMonth) || isNaN(lastRaceDay)) {
        console.error("Invalid date components.");
        console.log(lastChangedDateParts);
        return false;
      }

      const lastRaceDateObj = new Date(lastRaceYear, lastRaceMonth, lastRaceDay); // use the date string parts to make a new date object

      if (lastRaceDateObj > threeMonthsAgoDateObj) { // if driver raced in last 3 months, they are active
        postRaceDriver.active = 1
      } else {
        postRaceDriver.active = 0
      }

    });

    // debug databases
    // console.log(drivers);
    console.log(postRaceDrivers);

    // after all loopy-loops are done, use post-race driver array to create final ELO results
    $("#driverRatingOutput").val(JSON.stringify(postRaceDrivers));

  });// end $("#calc-elo").on("click"...

  // trigger: copy rating output as new input, clear output & race results
  $("#next-race").on("click", function () {
    driverRatingInput = $("#driverRatingInput");
    driverRatingOutput = $("#driverRatingOutput");
    raceResultsInput = $("#raceResultsInput");

    driverRatingInput.val(driverRatingOutput.val());
    driverRatingOutput.val("");
    raceResultsInput.val("");
  });

  // testing functions
  $("#test-driverRatingInput").on("click", function () {
    $("#driverRatingInput").val("");
    $("#driverRatingInput").val('{"troy_uyan": {"name": "Troy Uyan","races": 0,"rating": [1000],"date": ["Start"],"finishPos": [0],"totalCars": [0],"avgFinishPos": 0,"active": 0}}');
  });
  $("#test-raceResultsInput").on("click", function () {
    $("#raceResultsInput").val("");
    $("#raceResultsInput").val("RACE DATE: 2025/03/01\nRESULT: HYPERCAR =============\nNew Guy\nTroy Uyan\nMark Webber\nJohn Smith\nNew AM Guy");
  });

});// end doc ready
