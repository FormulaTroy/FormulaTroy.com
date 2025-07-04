//// extract RF2 race results by class
//// rf2la has jQ already loaded

// core result containers
let resultTableRowsRaw = $("table.r2la_table tr");
let resultTableRows = resultTableRowsRaw.slice(1); // remove header row
let driverCount = 0;

// text output by class
let unifiedClassResults = "";
let hypercarResults = "";
let lmp2Results = "";
let lmp3Results = "";
let lmgt1Results = "";
let lmgt2Results = "";
let lmgt3Results = "";
let gt4Results = "";

// helper: add driver to correct result list by class
function addDriverToResults(driverName, carClass) {
  switch (carClass) {

    case "PRO":
    case "PROAM":
    case "AM":
    case "BTCC":
    case "SPEC":
    case "TA2":
    case "GT":
    case "C1":
      unifiedClassResults += driverName + "\n"
      break;

    case "HYPERCAR":
      hypercarResults += driverName + "\n"
      break;

    case "LMP2":
      lmp2Results += driverName + "\n"
      break;

    case "LMP3":
      lmp3Results += driverName + "\n"
      break;

    case "LMGT1":
      lmgt1Results += driverName + "\n"
      break;

    case "LMGT2":
      lmgt2Results += driverName + "\n"
      break;

    case "LMGT3":
    case "GT3":
      lmgt3Results += driverName + "\n"
      break;

    case "GT4":
      gt4Results += driverName + "\n"
      break;

    default:
      console.warn("Class not found: " + carClass + " driven by " + driverName)
      break;
  }
  driverCount++;
}

// helper: convert the race date string to a sortable date string
function convertRaceDateString(dateString) {
  // date string format: 09 November 2023
  let dateStringParts = dateString.split(" ");
  let year = dateStringParts[2];
  let month = dateStringParts[1];
  let day = dateStringParts[0];

  const monthMap = new Map([
    ["january", "01"],
    ["february", "02"],
    ["march", "03"],
    ["april", "04"],
    ["may", "05"],
    ["june", "06"],
    ["july", "07"],
    ["august", "08"],
    ["september", "09"],
    ["october", "10"],
    ["november", "11"],
    ["december", "12"],
  ]);

  const lowerCaseMonthName = month.toLowerCase();

  month = monthMap.get(lowerCaseMonthName) || "Invalid month name";

  return "RACE DATE: " + year + "/" + month + "/" + day + "\n"
}

// helper: combine all the class results into a single output
function outputResults() {

  let textExportContents = "";
  let dateString = convertRaceDateString($("div.uk-margin-medium-bottom div.uk-badge.uk-badge-white.uk-badge-borderless:nth-child(3)").html().trim())

  // if a class result was added to, output that class
  if (unifiedClassResults != "") {
    textExportContents += dateString
    textExportContents += "RESULT: UNIFIED CLASS =============\n";
    textExportContents += unifiedClassResults;
  }
  if (hypercarResults != "") {
    textExportContents += dateString
    textExportContents += "RESULT: HYPERCAR =============\n";
    textExportContents += hypercarResults;
  }
  if (lmp2Results != "") {
    textExportContents += dateString
    textExportContents += "RESULT: LMP2 =============\n";
    textExportContents += lmp2Results;
  }
  if (lmp3Results != "") {
    textExportContents += dateString
    textExportContents += "RESULT: LMP3 =============\n";
    textExportContents += lmp3Results;
  }
  if (lmgt1Results != "") {
    textExportContents += dateString
    textExportContents += "RESULT: LMGT1 =============\n";
    textExportContents += lmgt1Results;
  }
  if (lmgt2Results != "") {
    textExportContents += dateString
    textExportContents += "RESULT: LMGT2 =============\n";
    textExportContents += lmgt2Results;
  }
  if (lmgt3Results != "") {
    textExportContents += dateString
    textExportContents += "RESULT: LMGT3 =============\n";
    textExportContents += lmgt3Results;
  }
  if (gt4Results != "") {
    textExportContents += dateString
    textExportContents += "RESULT: GT4 =============\n";
    textExportContents += gt4Results;
  }

  textExportContents = textExportContents.trim();

  // add export results to the text box, create if not there yet
  let textareaExisting = $("textarea#textExportContainer");

  if (textareaExisting.val() == null) {
    let textarea = $("<textarea id='textExportContainer'></textarea>");
    textarea.css("height", "750px").css("width", "1128px");
    textarea.val(textExportContents);
    $("nav").prepend(textarea);
    console.log(driverCount + " total drivers added to results");
  } else {
    let combinedText = textareaExisting.val() + "\n" + textExportContents;
    textareaExisting.val(combinedText);
    console.log(driverCount + " total drivers added to results");
  }

  return true;

}

// loop over the driver finishing order
resultTableRows.each(function () {

  // grab the columns for this row
  let cells = $(this).find("td, th");

  // reset vars
  let carClass = "";
  let driverName = "";
  let timeGapStatus = "";

  // DEFAULT SCRAPER: make sure there's enough columns, and see if there's a "Cat" (class) column or not
  if (cells.length == 13) {
    // get driver data, extract class from Car / Vehicle # column ("#24 Hypercar")
    carClass = $(cells[4]).text().trim();
    if (carClass.includes("Hypercar")) {
      carClass = "HYPERCAR"
    } else if (carClass.includes("GT3")) {
      carClass = "LMGT3"
    } else if (carClass.includes("SpecMiata")) {
      carClass = "SPEC"
    } else {
      carClass = "Unknown!";
      console.warn("Car class extraction from Vehicle column failed");
    }
    carClass = carClass.toUpperCase();
    driverName = $(cells[2]).text().trim();
    timeGapStatus = $(cells[6]).text().trim();
  } else if (cells.length == 14) {
    // get driver data, get class from Category column ("Hypercar|2")
    carClass = $(cells[2]).text().trim();
    carClass = carClass.substring(0, carClass.indexOf("|")); // turn "Class|Pos #" into "Class"
    carClass = carClass.toUpperCase();
    driverName = $(cells[3]).text().trim();
    timeGapStatus = $(cells[7]).text().trim();
  } else {
    console.warn("Results row does not have enough columns?");
  }

  // ALTERNATE SCRAPER: no cat column, vehicles don't show class, unify results
  // carClass = "SPEC";
  // driverName = $(cells[2]).text().trim();
  // timeGapStatus = $(cells[6]).text().trim();

  // ALTERNATE SCRAPER: cat is vague, vehicles do show class, split results
  // carClass = $(cells[5]).text().trim();
  // if (carClass.includes("Div I-II")  || carClass.includes("Div I + II") ) {
  //   carClass = "LMGT2"
  // } else if (carClass.includes("Div III")) {
  //   carClass = "LMGT3"
  // } else {
  //   carClass = "Unknown!";
  //   console.warn("Car class extraction from Vehicle column failed");
  // }

  // if not a "DNS", add to results
  if (timeGapStatus != "DNS") {
    addDriverToResults(driverName, carClass)
  }

});// end result loop

// make the text area


// output results to said textarea
outputResults()
