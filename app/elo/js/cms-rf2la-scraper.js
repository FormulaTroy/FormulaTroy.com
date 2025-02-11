//// rf2la has jQ already loaded
// extract race results by class
let resultTableRowsRaw = $("table.r2la_table tr");

resultTableRows = resultTableRowsRaw.slice(1); // remove header row

$("table.r2la_table tr").each(function() {

  let cells = $(this).find("td, th");

  if (cells.length >= 4) {


    let carClass = $(cells[2]).text().trim();

    carClass = carClass.substring(0, carClass.indexOf("|"));

    let driverName = $(cells[3]).text().trim();

    // Do something with the extracted data.  Examples:
    console.log(carClass, driverName);

    // Or store them in an array of objects:
    // extractedData.push({
    //   third: thirdColumn,
    //   fourth: fourthColumn
    // });

  } else {
    console.warn("Row does not have enough columns:", this);
  }
});



// NARS VMSC 2023
