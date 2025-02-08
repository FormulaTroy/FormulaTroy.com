$(document).ready(function () {

  //// calculator input functions (left side of UI)
  // helper: swap calculator displays (header, description, inputs)
  function swapCalcTypeDisplay(calcType) {

    // init header and description elements
    let headerElement = $("#js-calc-type-header");
    let shorthandDesc = $("#js-calc-type-desc-shorthand");
    let sprintDesc = $("#js-calc-type-desc-sprint");
    let enduranceDesc = $("#js-calc-type-desc-endurance");

    // init form input wrapper elements
    let shorthandInputWrapper = $("#shorthandInputWrapper");
    let raceDistanceTypeWrapper = $("#raceDistanceTypeWrapper");
    let raceDistanceUnitsWrapper = $("#raceDistanceUnitsWrapper");
    let raceLapTimeWrapper = $("#raceLapTimeWrapper");
    let raceFuelPerLapWrapper = $("#raceFuelPerLapWrapper");
    let raceFuelTankSizeWrapper = $("#raceFuelTankSizeWrapper");
    let raceFuelBufferLapsWrapper = $("#raceFuelBufferLapsWrapper");
    let racePaceLapFuelWrapper = $("#racePaceLapFuelWrapper");
    let pitstopDeltaWrapper = $("#pitstopDeltaWrapper");
    let fuelLeftAtPitstopWrapper = $("#fuelLeftAtPitstopWrapper");

    // show/hide elements based on selected calculator type
    switch (calcType) {
      case "calcShorthand":
        headerElement.html("Shorthand Calculator");

        shorthandDesc.show();
        sprintDesc.hide();
        enduranceDesc.hide();

        shorthandInputWrapper.show();
        raceDistanceTypeWrapper.hide();
        raceDistanceUnitsWrapper.hide();
        raceLapTimeWrapper.hide();
        raceFuelPerLapWrapper.hide();
        raceFuelTankSizeWrapper.hide();
        raceFuelBufferLapsWrapper.hide();
        racePaceLapFuelWrapper.hide();
        pitstopDeltaWrapper.hide();
        fuelLeftAtPitstopWrapper.hide();
        break;

      case "calcSprint":
        headerElement.html("Sprint Race Calculator");

        shorthandDesc.hide();
        sprintDesc.show();
        enduranceDesc.hide();

        shorthandInputWrapper.hide();
        raceDistanceTypeWrapper.show();
        raceDistanceUnitsWrapper.show();
        raceLapTimeWrapper.show();
        isLapTimeFieldNeeded();
        raceFuelPerLapWrapper.show();
        raceFuelTankSizeWrapper.show();
        raceFuelBufferLapsWrapper.show();
        racePaceLapFuelWrapper.show();
        pitstopDeltaWrapper.hide();
        fuelLeftAtPitstopWrapper.hide();
        break;

      case "calcEndurance":
        headerElement.html("Endurance Race Calculator");

        shorthandDesc.hide();
        sprintDesc.hide();
        enduranceDesc.show();

        shorthandInputWrapper.hide();
        raceDistanceTypeWrapper.show();
        raceDistanceUnitsWrapper.show();
        raceLapTimeWrapper.show();
        isLapTimeFieldNeeded();
        raceFuelPerLapWrapper.show();
        raceFuelTankSizeWrapper.show();
        raceFuelBufferLapsWrapper.show();
        racePaceLapFuelWrapper.show();
        pitstopDeltaWrapper.show();
        fuelLeftAtPitstopWrapper.show();
        break;

      default:
        console.log("ERROR: switch(calcType) is invalid!")
        break;
    }
  }

  // trigger: change calculator type
  $('input[name="calcType"]').on("change", function () {
    let calcType = $('input[name="calcType"]:checked').val();
    swapCalcTypeDisplay(calcType);
    validateFormInputs();
  });

  // helper: toggle raceLapTime field based on raceDistanceType
  function isLapTimeFieldNeeded() {
    let raceDistanceTypeValue = $("#raceDistanceType").val();
    if (raceDistanceTypeValue == "Laps") {
      $("#raceLapTime").hide();
    } else {
      $("#raceLapTime").show();
    }
  }

  // trigger: update fields based on raceDistanceType
  $("#raceDistanceType").on("change", function () {
    let raceDistanceTypeValue = $(this).val();
    isLapTimeFieldNeeded();
    $('#raceDistanceUnitsWrapper label[for="raceDistanceUnits"]').html("How Many " + raceDistanceTypeValue + " Is The Race?");
  });

  // helper: convert lap time as string (1:32.932) into seconds (92.932)
  function convertLapTimeStringToSeconds(lapTimeString) {
    try {
      let parts = lapTimeString.split(':');
      let minutes = parseInt(parts[0]);
      if (minutes == null) {
        minutes = 0;
      }
      let secondsAndMilliseconds = parts[1].split('.');
      let seconds = parseInt(secondsAndMilliseconds[0]);
      let milliseconds = parseInt(secondsAndMilliseconds[1]) || 0; // Handle cases where milliseconds are missing
      let totalSeconds = minutes * 60 + seconds + milliseconds / 1000;
      return totalSeconds;
    } catch (error) {
      //console.log("Average Race Lap Time Didn't Meet Minimum Format of #:#")
      //console.log(error);
      return false;
    }
  }

  //// calculator results functions (right side of UI)
  //// sequence of events:
  //// onchange events trigger validate functions, which if they pass,
  //// then call the calculation function

  // trigger: call validation whenever any field changes or key is pressed
  $("form").on("change keyup", ":input", function () {
    validateFormInputs();
  });

  // helper: validate user inputs
  function validateFormInputs() {
    // reset result html
    let results = $("#results")
    results.html("<p>These fields need to be filled out:</p><ul>");
    let isError = 0;

    // get form fields or reset vars until needed
    let calcType = $('input[name="calcType"]:checked');
    let shorthandInput = "";
    let raceDistanceType = "";
    let raceDistanceUnits = "";
    let raceLapTime = "";
    let raceFuelPerLap = "";
    let raceFuelTankSize = "";
    let pitstopDelta = "";
    let fuelLeftAtPitstop = "";

    // validate based on selected calc type
    switch (calcType.val()) {
      case "calcShorthand":
        shorthandInput = $("#shorthandInput");

        if (shorthandInput.val().trim() === "") {
          isError = 1;
        }

        // split the input into parts for each variable
        const inputPartsArray = shorthandInput.val().split(" ");

        if (inputPartsArray.length >= 4 && inputPartsArray.length < 6) {

          // Check RaceMinutes (float), FuelPerLap (float), FuelTankSize (float)
          if (isNaN(parseFloat(inputPartsArray[0])) || isNaN(parseFloat(inputPartsArray[2])) || isNaN(parseFloat(inputPartsArray[3]))) {
            isError = 1;
          }

          // Check LapTime (float:float)
          if (typeof inputPartsArray != "undefined") {
            const lapTimeString = inputPartsArray[1].split(":");
            if (lapTimeString.length !== 2 || isNaN(parseFloat(lapTimeString[0])) || isNaN(parseFloat(lapTimeString[1]))) {
              isError = 1;
            }
          }

          // check AdditionalLaps (optional, float)
          // if it's there, check it's not just a trailing space, and that it's a float
          if (typeof inputPartsArray[4] != "undefined" || typeof inputPartsArray[4] == "") {
            if (isNaN(parseFloat(inputPartsArray[4]))) {
              isError = 1;
            }
          } else if (typeof inputPartsArray[4] == "undefined") {
            // if it's not there, set to 0
            inputPartsArray[4] = 0;
          }

        } else {
          isError = 1; // Not enough elements in array, or too many
        }

        if (isError == 1) {
          shorthandInput.addClass("is-invalid");
          results.append("<h5>Shorthand Input</h5><p>This text field requires very specific formatting in order to calculate results. Each variable needs a single space between them. But make sure there is not an extra space at the end of your input.</p><ul><li>RaceMinutes: How long the race is in minutes (i.e. 1.5hrs = 90)</li><li>LapTime: The average race lap time formatted as MM:SS:MS</li><li>FuelPerLap: The average fuel used per lap</li><li>FuelTankSize: The maximum fuel tank capacity</li><li>AdditionalLaps (optional): Extra laps of fuel buffer, usually 1</li></ul><p>Examples of valid inputs:</p><ul><li>144 1:30.432 3.2 90 1</li><li>90 0:59 3.35 100</li><li>30 1:49.5 4.2 150 1.5</li></ul>");
        } else {
          shorthandInput.removeClass("is-invalid");
          calculateShorthandResults(parseFloat(inputPartsArray[0]), inputPartsArray[1], parseFloat(inputPartsArray[2]), parseFloat(inputPartsArray[3]), parseFloat(inputPartsArray[4]));
        }

        break;

      case "calcSprint":
        raceDistanceType = $("#raceDistanceType");
        raceDistanceUnits = $("#raceDistanceUnits");
        raceLapTime = $("#raceLapTime");
        raceFuelPerLap = $("#raceFuelPerLap");
        raceFuelTankSize = $("#raceFuelTankSize");

        if (raceDistanceUnits.val() <= 0) {
          results.append("<li>The length of the race</li>");
          raceDistanceUnits.addClass("is-invalid");
          isError = 1;
        } else {
          raceDistanceUnits.removeClass("is-invalid");
        }

        if (raceDistanceType.val() != "Laps") {
          let raceLapTimeRawValue = $("#raceLapTime").val();
          let raceLapTimeCleaned = raceLapTimeRawValue.replace(/[^0-9:.]/g, ''); // Remove invalid characters
          let raceLapTimeInSeconds = convertLapTimeStringToSeconds(raceLapTimeCleaned);
          if (raceLapTimeInSeconds <= 0 || raceLapTimeInSeconds == false) {
            results.append("<li>The average race lap time, examples:<ul class=\"mb-0\"><li>1:32.181</li><li>0:52</li><li>1:58.7</li></ul></li>");
            raceLapTime.addClass("is-invalid");
            isError = 1;
          } else {
            raceLapTime.removeClass("is-invalid");
          }
        }

        if (raceFuelPerLap.val() <= 0) {
          results.append("<li>Average fuel per lap</li>");
          raceFuelPerLap.addClass("is-invalid");
          isError = 1;
        } else {
          raceFuelPerLap.removeClass("is-invalid");
        }

        if (raceFuelTankSize.val() <= 0) {
          results.append("<li>Max fuel tank size</li>");
          raceFuelTankSize.addClass("is-invalid");
          isError = 1;
        } else {
          raceFuelTankSize.removeClass("is-invalid");
        }

        if (isError == 0) {
          calculateSprintResults();
        }

        break;

      case "calcEndurance":
        raceDistanceType = $("#raceDistanceType");
        raceDistanceUnits = $("#raceDistanceUnits");
        raceLapTime = $("#raceLapTime");
        raceFuelPerLap = $("#raceFuelPerLap");
        raceFuelTankSize = $("#raceFuelTankSize");
        pitstopDelta = $("#pitstopDelta");
        fuelLeftAtPitstop = $("#fuelLeftAtPitstop");

        // TO DO
        break;

      default:
        console.log("ERROR: switch(calcType) is invalid!")
        break;
    }

  }

  // helper: convert total fuel needed into progress bar display by stint
  function stintsToProgressBars(finalFuelNeeded, raceFuelTankSize, results) {
    // init local vars
    let isFirst = true;
    let strategyText = "";
    let stintFractionToPercent = 0;

    // loop over total fuel, display progress bars, subtract a full tank
    while (finalFuelNeeded > 0) {

      // strategy flavor text
      if (isFirst) {
        strategyText = "Start with ";
        isFirst = false;
      } else {
        strategyText = "Pit Stop for ";
      }

      // if remaining fuel >= a full tank, add full stop, otherwise add final partial stop
      if (finalFuelNeeded >= raceFuelTankSize) {
        results.append('<div class="progress" role="progressbar"><div class="progress-bar overflow-visible bg-success text-start" style="width: 100%">&nbsp;&nbsp;&nbsp;' + strategyText + raceFuelTankSize + '</div></div>');
      } else if (finalFuelNeeded >= (.20 * raceFuelTankSize)) {
        stintFractionToPercent = finalFuelNeeded / raceFuelTankSize * 100;
        stintFractionToPercent = parseFloat(stintFractionToPercent.toFixed(2));
        finalFuelNeeded = parseFloat(finalFuelNeeded.toFixed(2));
        results.append('<div class="progress" role="progressbar"><div class="progress-bar overflow-visible progress-bar-striped progress-bar-animated bg-primary text-start" style="width: ' + stintFractionToPercent + '%">&nbsp;&nbsp;&nbsp;' + strategyText + finalFuelNeeded + '</div></div>');
      } else {
        stintFractionToPercent = finalFuelNeeded / raceFuelTankSize * 100;
        stintFractionToPercent = parseFloat(stintFractionToPercent.toFixed(2));
        finalFuelNeeded = parseFloat(finalFuelNeeded.toFixed(2));
        results.append('<div class="progress" role="progressbar"><div class="progress-bar overflow-visible progress-bar-striped progress-bar-animated bg-danger text-start" style="width: ' + stintFractionToPercent + '%">&nbsp;&nbsp;&nbsp;' + strategyText + finalFuelNeeded + ' - Try Fuel Saving Instead?</div></div>');
      }

      finalFuelNeeded -= raceFuelTankSize;
    }
  }

  // helper: calc results for shorthand input
  function calculateShorthandResults(raceMinutes, raceLapTimeRawValue, raceFuelPerLap, raceFuelTankSize, raceFuelBufferLaps) {
    // convert lap time
    let raceLapTimeCleaned = raceLapTimeRawValue.replace(/[^0-9:.]/g, '');
    let raceLapTimeInSeconds = convertLapTimeStringToSeconds(raceLapTimeCleaned);
    // init final results vars
    let results = $("#results");
    results.html("");
    let finalLaps = 0;
    let finalLapsWithBuffer = 0;
    let finalFuelNeeded = 0;
    let finalStintsNeeded = 0;

    // strategy calc
    finalLaps = Math.ceil(raceMinutes * 60 / raceLapTimeInSeconds);
    finalLapsWithBuffer = parseFloat(finalLaps) + parseFloat(raceFuelBufferLaps);
    finalFuelNeeded = finalLapsWithBuffer * raceFuelPerLap; // total fuel
    finalFuelNeeded = parseFloat(finalFuelNeeded.toFixed(2));
    finalStintsNeeded = finalFuelNeeded / raceFuelTankSize // number of stints
    finalStintsNeeded = parseFloat(finalStintsNeeded.toFixed(2));

    // display results
    results.append("<p>Total Race Laps: <strong>" + finalLaps + "</strong></p>");
    results.append("<p>Total Fuel: <strong>" + finalFuelNeeded + "</strong></p>");
    results.append("<p>Total Stints: <strong>" + finalStintsNeeded + "</strong></p>");
    stintsToProgressBars(finalFuelNeeded, raceFuelTankSize, results);

  }

  // helper: calc results for sprint races
  function calculateSprintResults() {
    // get values directly, versus getting the field like in validation function
    let raceDistanceType = $("#raceDistanceType").val();
    let raceDistanceUnits = $("#raceDistanceUnits").val();
    let raceLapTimeRawValue = $("#raceLapTime").val();
    let raceLapTimeCleaned = raceLapTimeRawValue.replace(/[^0-9:.]/g, '');
    let raceLapTimeInSeconds = convertLapTimeStringToSeconds(raceLapTimeCleaned);
    let raceFuelPerLap = $("#raceFuelPerLap").val();
    let raceFuelTankSize = $("#raceFuelTankSize").val();
    let raceFuelBufferLaps = $("#raceFuelBufferLaps").val();
    let racePaceLapFuel = $("#racePaceLapFuel").val();
    // init final results vars
    let results = $("#results");
    results.html("");
    let finalLaps = 0;
    let finalLapsWithBuffer = 0;
    let finalFuelNeeded = 0;
    let finalStintsNeeded = 0;

    // if it's timed, find lap count, else use units directly if already lap-based
    if (raceDistanceType != "Laps") {
      if (raceDistanceType == "Hours") {
        raceDistanceUnits *= 60; // convert hours->minutes
      }
      raceDistanceUnits *= 60; // convert minutes->seconds
      finalLaps = Math.ceil(raceDistanceUnits / raceLapTimeInSeconds); // race seconds divided by lap seconds, rounded up
    } else {
      finalLaps = raceDistanceUnits;
    }

    // protect extra lap fuel buffer from being null
    if (!raceFuelBufferLaps) { raceFuelBufferLaps = 0 }

    // calc final strategy numbers
    finalLapsWithBuffer = parseFloat(finalLaps) + parseFloat(raceFuelBufferLaps) + parseFloat(racePaceLapFuel); // add buffers
    finalFuelNeeded = finalLapsWithBuffer * raceFuelPerLap; // total fuel
    finalFuelNeeded = parseFloat(finalFuelNeeded.toFixed(2));
    finalStintsNeeded = finalFuelNeeded / raceFuelTankSize // number of stints
    finalStintsNeeded = parseFloat(finalStintsNeeded.toFixed(2));

    // display results
    results.append("<p>Total Race Laps: <strong>" + finalLaps + "</strong></p>");
    results.append("<p>Total Fuel: <strong>" + finalFuelNeeded + "</strong></p>");
    results.append("<p>Total Stints: <strong>" + finalStintsNeeded + "</strong></p>");
    stintsToProgressBars(finalFuelNeeded, raceFuelTankSize, results);
  }

  // helper: calc results for endurance races
  function calculateEnduranceResults() {
    // get values directly, versus getting the field like in validation function
    let raceDistanceType = $("#raceDistanceType").val();
    let raceDistanceUnits = $("#raceDistanceUnits").val();
    let raceLapTimeRawValue = $("#raceLapTime").val();
    let raceLapTimeCleaned = raceLapTimeRawValue.replace(/[^0-9:.]/g, '');
    let raceLapTimeInSeconds = convertLapTimeStringToSeconds(raceLapTimeCleaned);
    let raceFuelPerLap = $("#raceFuelPerLap").val();
    let raceFuelTankSize = $("#raceFuelTankSize").val();
    let raceFuelBufferLaps = $("#raceFuelBufferLaps").val();
    let racePaceLapFuel = $("#racePaceLapFuel").val();
    let pitstopDelta = $("#pitstopDelta").val();
    let fuelLeftAtPitstop = $("#fuelLeftAtPitstop").val();
  }

  // init post-load defaults
  $("#raceFuelBufferLaps").val(1);
  $("#pitstopDelta").val(45);
  validateFormInputs();

  // DEBUG DEFAULTS
  // $("#raceDistanceUnits").val(2);
  // $("#raceLapTime").val("1:30.201");
  // $("#raceFuelPerLap").val(3);
  // $("#raceFuelTankSize").val(80);

});// end doc ready
