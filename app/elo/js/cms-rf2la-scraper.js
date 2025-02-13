//// extract RF2 race results by class
//// rf2la has jQ already loaded

// core result containers
let resultTableRowsRaw = $("table.r2la_table tr");
let resultTableRows = resultTableRowsRaw.slice(1); // remove header row
let driverCount = 0;

// text output by class
let unifiedClassResults = "";
let hypercarResults = "";
let lmgt3Results = "";

// helper: add driver to correct result list by class
function addDriverToResults(driverName, carClass) {
  switch (carClass) {

    case "PRO":
    case "PROAM":
    case "AM":
    case "BTCC":
      unifiedClassResults += driverName + "\n"
      break;

    case "HYPERCAR":
      hypercarResults += driverName + "\n"
      break;

    case "LMGT3":
      lmgt3Results += driverName + "\n"
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
  if (lmgt3Results != "") {
    textExportContents += dateString
    textExportContents += "RESULT: LMGT3 =============\n";
    textExportContents += lmgt3Results;
  }

  textExportContents = textExportContents.trim();

  // add export results to the text box
  let textareaExisting = $("textarea#textExportContainer");
  let combinedText = textareaExisting.val() + "\n" + textExportContents;
  textareaExisting.val(combinedText);
  console.log(driverCount + " total drivers added to results");

}

// loop over the driver finishing order
resultTableRows.each(function () {

  // grab the columns for this row
  let cells = $(this).find("td, th");

  // make sure there's enough columns
  if (cells.length >= 4) {

    // get driver data
    let carClass = $(cells[2]).text().trim();
    carClass = carClass.substring(0, carClass.indexOf("|")); // turn "Class|Pos #" into "Class"
    carClass = carClass.toUpperCase();
    let driverName = $(cells[3]).text().trim();
    let timeGapStatus = $(cells[7]).text().trim();

    // if not a "DNS", add to results
    if (timeGapStatus != "DNS") {
      addDriverToResults(driverName, carClass)
    }

  } else {
    console.warn("Row does not have enough columns: ", this);
  }

});// end result loop

// make the text area
let textarea = $("<textarea id='textExportContainer'></textarea>");
textarea.css("height", "750px").css("width", "1128px");
textarea.val("");
$("nav").prepend(textarea);

// output results to said textarea
outputResults()
