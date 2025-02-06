$(document).ready(function () {

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
        areLapsNeeded();
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
        areLapsNeeded();
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

  // calc fields
  function dskaldjklsjdkljsakld(calcType) {
    let shorthandInput = $("#shorthandInput");
    let raceDistanceType = $("#raceDistanceType");
    let raceDistanceUnits = $("#raceDistanceUnits");
    let raceLapTime = $("#raceLapTime");
    let raceFuelPerLap = $("#raceFuelPerLap");
    let raceFuelTankSize = $("#raceFuelTankSize");
    let raceFuelBufferLaps = $("#raceFuelBufferLaps");
    let racePaceLapFuel = $("#racePaceLapFuel");
    let pitstopDelta = $("#pitstopDelta");
    let fuelLeftAtPitstop = $("#fuelLeftAtPitstop");
  }

  // trigger: change calculator type
  $('input[name="calcType"]').on("change", function() {
    let calcType = $('input[name="calcType"]:checked').val();
    swapCalcTypeDisplay(calcType);
  });

  // helper: toggle raceLapTime based on raceDistanceType
  function areLapsNeeded(raceDistanceTypeValue) {
    if (raceDistanceTypeValue == "Laps") {
      $("#raceLapTime").hide();
    } else {
      $("#raceLapTime").show();
    }
  };

  // helper: change field label of raceDistanceUnits
  function updateDistanceUnitLabel(raceDistanceTypeValue) {
    $('#raceDistanceUnitsWrapper label[for="raceDistanceUnits"]').html("How Many "+raceDistanceTypeValue+" Is The Race?");
  }

  // trigger: update fields based on raceDistanceType
  $("#raceDistanceType").on("change",function(){
    let raceDistanceTypeValue = $("#raceDistanceType").val()
    areLapsNeeded(raceDistanceTypeValue);
    updateDistanceUnitLabel(raceDistanceTypeValue);
  });

  // init post-load default
  $("#raceFuelBufferLaps").val(1);

});// end doc ready
