$(document).ready(function () {

  // Global database state
  let drivers = {};
  let postRaceDrivers = {};

  // helper: add new driver to drivers json with defaults
  function addNewDriver(driverName) {
    let driverMachineName = getDriverMachineName(driverName);
    let defaultELO = 1000;

    let initialDriverData = {
      name: driverName,
      rating: defaultELO,
      avgFinishPos: 0,
      active: 0,
      visible: 1,
      racesHistory: []
    };

    let newDriver = { [driverMachineName]: structuredClone(initialDriverData) };
    let newPostRaceDriver = { [driverMachineName]: structuredClone(initialDriverData) };

    $.extend(drivers, newDriver);
    $.extend(postRaceDrivers, newPostRaceDriver);
  }

  // helper: convert driver name to machine name
  function getDriverMachineName(driverName) {
    return driverName.toLowerCase().replace(/\s+/g, '_');
  }

  // helper: find driver object in drivers json by name string
  function findDriverByName(driverName) {
    let driverMachineName = getDriverMachineName(driverName);
    let foundDriver = drivers[driverMachineName];

    if (foundDriver != null) {
      return foundDriver;
    } else {
      addNewDriver(driverName);
      return drivers[driverMachineName];
    }
  }

  // helper: clone the drivers array[object->prop] structure to a new variable
  function createPostRaceDrivers(inputDrivers) {
    postRaceDrivers = structuredClone(inputDrivers);
  }

  // helper: overwrite pre-race drivers with post-race state for multi-race batch processing
  function overwritePreRaceDriversWithNewResult(inputPostRaceDrivers) {
    drivers = structuredClone(inputPostRaceDrivers);
  }

  // helper: find driver object in postRaceDrivers json by name string
  function findPostRaceDriverByName(driverName) {
    let driverMachineName = getDriverMachineName(driverName);
    let foundDriver = postRaceDrivers[driverMachineName];

    if (foundDriver != null) {
      return foundDriver;
    } else {
      addNewDriver(driverName);
      return postRaceDrivers[driverMachineName];
    }
  }

  // helper: split results input into multiple race results by splitting on "RACE DATE" line
  function parseRaceResultsInputIntoRaces(raceResultsInput) {
    const raceBlocks = raceResultsInput.split(/(RACE DATE: \d{4}\/\d{2}\/\d{2})/);
    const results = [];

    for (let i = 1; i < raceBlocks.length; i += 2) {
      const date = raceBlocks[i].trim();
      const resultBlock = raceBlocks[i + 1].trim();

      const categoryMatch = resultBlock.match(/RESULT: (.+?) =============\n/);
      if (categoryMatch) {
        const category = categoryMatch[1].trim();
        const extractedDrivers = resultBlock
          .split("=============\n")[1]
          .trim()
          .split("\n")
          .map(driver => driver.trim())
          .filter(driver => driver !== "");

        results.push({ date: date, category: category, drivers: extractedDrivers });
      }
    }
    return results;
  }

  // helper: compare driver and opponent ratings to get expected result as a %
  function addExpectedResultELO(driverRating, opponentRating, expectedResultsForRace) {
    let expectedResultMagnification = 480;
    let expectedResult = 1 / (1 + Math.pow(10, (opponentRating - driverRating) / expectedResultMagnification));
    expectedResultsForRace.push(expectedResult);
  }

  // helper: compare expected and actual results and calculate rating adjustment
  function updateDriverRatingELO(driver, expectedResultsForRace, actualResultsForRace, raceDate) {
    let maxRatingAdjustment = 2.25;

    let expectedResultScore = expectedResultsForRace.reduce((a, b) => a + b, 0);
    let actualResultScore = actualResultsForRace.reduce((a, b) => a + b, 0);

    let currentRating = driver.rating !== undefined ? driver.rating : 1000;
    let newDriverRating = currentRating + maxRatingAdjustment * (actualResultScore - expectedResultScore);
    newDriverRating = Math.round(newDriverRating);

    let postRaceDriverObj = findPostRaceDriverByName(driver.name.toString());

    if (!postRaceDriverObj._currentRace) {
      postRaceDriverObj._currentRace = {
        date: raceDate,
        rating: newDriverRating
      };
    } else {
      postRaceDriverObj._currentRace.rating = newDriverRating;
    }

    postRaceDriverObj.rating = newDriverRating;
  }

  // trigger: calculate the elo changes based on current ratings and new race result
  $("#calc-elo").on("click", function () {

    let driverRatingInput = $("#driverRatingInput").val();
    let raceResultsInput = $("#raceResultsInput").val();

    const activeCutOffDateObj = new Date();
    activeCutOffDateObj.setMonth(activeCutOffDateObj.getMonth() - 3);
    const visibleCutOffDateObj = new Date();
    visibleCutOffDateObj.setFullYear(visibleCutOffDateObj.getFullYear() - 1);

    if (driverRatingInput !== "" && raceResultsInput !== "") {
      drivers = JSON.parse(driverRatingInput);
      createPostRaceDrivers(drivers);

      let raceResultsLines = raceResultsInput.split('\n');
      if (raceResultsLines.length < 4) {
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

    let individualRaceResults = parseRaceResultsInputIntoRaces(raceResultsInput);

    individualRaceResults.sort(function (a, b) {
      if (a.date < b.date) return -1;
      if (a.date > b.date) return 1;
      return 0;
    });


    //// multi-dimensional loop starts here ////
    /// LOOP 1: CLASS RESULTS                ///
    /// LOOP 2: DRIVERS                      ///
    /// LOOP 3: DRIVER VS OTHER DRIVERS      ///

    // loop over each race->class result
    $.each(individualRaceResults, function (index, resultBlock) {
      const raceResults = resultBlock.drivers;
      const driversInClass = resultBlock.drivers.length;
      let rawDate = resultBlock.date;
      let raceDate = rawDate.substring(rawDate.lastIndexOf(":") + 2).trim();

      $.each(raceResults, function (driverIndex, driverLine) {
        const driverName = driverLine.trim();
        if (driverName === "") return true;

        let currentDriver = findDriverByName(driverName);
        let expectedResultsForRace = [];
        let actualResultsForRace = [];

        $.each(raceResults, function (compareIndex, opponentLine) {
          const opponentDriverName = opponentLine.trim();

          // Skip self comparison
          if (compareIndex === driverIndex || opponentDriverName === "") {
            return true;
          }

          let opponentDriver = findDriverByName(opponentDriverName);
          let currentDriverRating = currentDriver.rating;
          let opponentDriverRating = opponentDriver.rating;

          addExpectedResultELO(currentDriverRating, opponentDriverRating, expectedResultsForRace);

          // If current driver finished earlier in the array, they beat the opponent
          let actualResult = driverIndex < compareIndex ? 1 : 0;
          actualResultsForRace.push(actualResult);
        });

        if (expectedResultsForRace.length === actualResultsForRace.length) {
          updateDriverRatingELO(currentDriver, expectedResultsForRace, actualResultsForRace, raceDate);
        } else {
          alert("Array mismatch error during processing.");
          return false;
        }

        let postRaceDriverObj = findPostRaceDriverByName(currentDriver.name.toString());

        if (postRaceDriverObj._currentRace) {
          postRaceDriverObj._currentRace.finishPos = driverIndex + 1;
          postRaceDriverObj._currentRace.totalCars = driversInClass;

          postRaceDriverObj.racesHistory.push(postRaceDriverObj._currentRace);
          delete postRaceDriverObj._currentRace;
        }
      });

      overwritePreRaceDriversWithNewResult(postRaceDrivers);
    });

    // Post-processing for summary stats
    $.each(postRaceDrivers, function (index, postRaceDriver) {
      const history = postRaceDriver.racesHistory || [];

      if (history.length === 0) {
        postRaceDriver.avgFinishPos = 0;
        postRaceDriver.active = 0;
        postRaceDriver.visible = 1;
        return true;
      }

      let sumOfFinishingPositions = history.reduce((sum, race) => sum + race.finishPos, 0);
      postRaceDriver.avgFinishPos = (sumOfFinishingPositions / history.length).toFixed(1);

      const lastRace = history[history.length - 1];
      const lastRaceDateParts = lastRace.date.split('/');

      if (lastRaceDateParts.length !== 3) {
        console.error("Invalid last date format; Expected YYYY/MM/DD.", lastRace.date);
        return true;
      }

      const lastRaceYear = parseInt(lastRaceDateParts[0], 10);
      const lastRaceMonth = parseInt(lastRaceDateParts[1], 10) - 1;
      const lastRaceDay = parseInt(lastRaceDateParts[2], 10);

      const lastRaceDateObj = new Date(lastRaceYear, lastRaceMonth, lastRaceDay);

      if (lastRaceDateObj >= activeCutOffDateObj) {
        postRaceDriver.active = 1;
        postRaceDriver.visible = 1;
      } else if (lastRaceDateObj >= visibleCutOffDateObj) {
        postRaceDriver.active = 0;
        postRaceDriver.visible = 1;
      } else {
        postRaceDriver.active = 0;
        postRaceDriver.visible = 0;
      }
    });

    $("#driverRatingOutput").val(JSON.stringify(postRaceDrivers));
  });

  $("#next-race").on("click", function () {
    $("#driverRatingInput").val($("#driverRatingOutput").val());
    $("#driverRatingOutput").val("");
    $("#raceResultsInput").val("");
  });

  $("#test-driverRatingInput").on("click", function () {
    $("#driverRatingInput").val(JSON.stringify({
      "troy_uyan": {
        "name": "Troy Uyan",
        "rating": 1000,
        "avgFinishPos": "0.0",
        "active": 0,
        "visible": 1,
        "racesHistory": []
      }
    }));
  });

  $("#test-raceResultsInput").on("click", function () {
    $("#raceResultsInput").val("RACE DATE: 2025/03/01\nRESULT: HYPERCAR =============\nNew Guy\nTroy Uyan\nMark Webber\nJohn Smith\nNew AM Guy");
  });

});
