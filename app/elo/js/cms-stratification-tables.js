$(document).ready(function () {

  // helper: return license column text data based on elo rating
  // Licensed Results
  // Copper (   0-1099)
  // Bronze (1100-1199)
  // Silver (1200-1299)
  //   Gold (1300-1499)
  //   Plat (1500+    )
  function getLicenseIcon(rating) {
    if (rating <= 1099) {
      return "<span class='badge medal medal-copper'>Copper</span>";
    } else if (rating <= 1199) {
      return "<span class='badge medal medal-bronze'>Bronze</span>";
    } else if (rating <= 1299) {
      return "<span class='badge medal medal-silver'>Silver</span>";
    } else if (rating <= 1499) {
      return "<span class='badge medal medal-gold'>Gold</span>";
    } else {
      return "<span class='badge medal medal-platinum'>Platinum</span>";
    }
  }

  // helper: return different flags based on the driver's name
  // note: this is decoupled from the json so it doesn't have to be re-entered if the json is regenerated
  function getFlag(name) {
    let flagCode = "xx";
    switch (name) {
      case "Troy Uyan":
      case "Jon Uyan":
        flagCode = "tr";
        break;
      case "Matthew Overton":
        flagCode = "ca";
        break;
      default:
        flagCode = "us";
        break;
    }
    return '<span class="fi fi-' + flagCode + '"></span>';
  }

  // helper: take a rating adjustment int and turn it into a display with icons
  function prettyRatingChange(ratingChange) {
    if (ratingChange < 0) {
      return '<i class="bi bi-arrow-down arrow-red"></i> ' + Math.abs(ratingChange);
    } else if (ratingChange == 0) {
      return '<i class="bi bi-dash-lg"></i> ' + ratingChange;
    } else {
      return '<i class="bi bi-arrow-up arrow-green"></i> ' + ratingChange;
    }
  }

  // helper: check if the driver is on probation
  function checkIfProbation(raceCount) {
    if (raceCount <= 10) {
      return raceCount + ' <i class="bi bi-person-fill-add" title="First 10 races are subject to bigger rating adjustments"></i>';
    } else {
      return raceCount;
    }
  }

  // event: open up the inspect modal for a particular driver
  $('#cms-strat-modern').on('click', '.inspect-button', function () {

    // load driver data from json
    let driver = $(this).data('driverData');
    console.log("Driver Data:", driver);

    // reset the modal html for the new driver
    $('#driverModalLabel').html(getFlag(driver.name) + " " + driver.name + " (Modern)");
    $('#modalBody').empty();
    let modalBodyHTML = '<div class="container-fluid"><div class="row">';

    // TO DO chart thingy probably at the top?
    //driver.rating is the array of liiiiiife

    // left side (stats)
    modalBodyHTML += '<div class="col">';
    modalBodyHTML += '<h4>Stats</h4>';
    modalBodyHTML += '<p>' + getLicenseIcon(driver.rating[driver.rating.length - 1]) + '</p>';
    modalBodyHTML += '<p><strong>Rating:</strong> ' + driver.rating[driver.rating.length - 1] + ' (' + (prettyRatingChange(driver.rating[driver.rating.length - 1] - driver.rating[driver.rating.length - 2])) + ')</p>';
    modalBodyHTML += '<p><strong>Ranked Races:</strong> ' + driver.races + '</p>';
    modalBodyHTML += '<p><strong>Last Race:</strong> ' + driver.lastChangedDate + '</p>';
    if (driver.races <= 10) {
      modalBodyHTML += '<div class="alert alert-light" role="alert"><i class="bi bi-exclamation-triangle-fill" style="color:yellow"></i> ' + driver.name + ' is on probation (first 10 races) and is subject to faster rating adjustments.</div>';
    }



    // right side (eligible car classes)
    modalBodyHTML += '</div><div class="col">';
    // TO DO get class icons
    // make grid of what you're allowed to race right now



    // write the results
    $('#modalBody').append(modalBodyHTML);

  });



















  // init the modern stratification datatable
  $('#cms-strat-modern').DataTable({
    ajax: {
      url: 'driver-jsons/elo-modern.json',
      dataSrc: function (json) {

        var data = [];

        // loop over every driverMachineName key
        for (var key in json) {
          if (json.hasOwnProperty(key)) {

            // load the driver's json
            var driverData = json[key];

            // create an object for each row
            var rowData = {};

            // map data to json values or send json values to functions to get returns back
            rowData.flagImage = getFlag(driverData.name);
            rowData.name = driverData.name;
            rowData.driverLicense = getLicenseIcon(driverData.rating[driverData.rating.length - 1]);
            rowData.rating = driverData.rating[driverData.rating.length - 1];
            rowData.ratingChange = prettyRatingChange(driverData.rating[driverData.rating.length - 1] - driverData.rating[driverData.rating.length - 2]);
            rowData.races = driverData.races;
            rowData.lastChangedDate = driverData.lastChangedDate;
            rowData.driverData = driverData; // store the entire driver's object for the inspect modal

            // add object to the overall data return
            data.push(rowData);
          }
        }
        console.log(data);
        return data;
      }
    },
    columns: [
      { title: "", data: "flagImage", orderable: false, width: "20px" },
      { title: "<i class='bi bi-person-fill'></i> Driver", data: "name", orderable: true, width: "25%" },
      { title: "<i class='bi bi-person-vcard-fill'></i> License", data: "driverLicense", orderable: false },
      { title: "<i class='bi bi-trophy-fill'></i> Rating", data: "rating", orderable: true },
      { title: "<i class='bi bi-graph-up-arrow'></i> Change", data: "ratingChange", orderable: false },
      { title: "<i class='bi bi-car-front-fill'></i> Races", data: "races", orderable: true },
      { title: "<i class='bi bi-calendar2-check-fill'></i> Updated", data: "lastChangedDate", orderable: true },
      {
        title: "<i class='bi bi-search'></i> Details",
        data: "driverData",
        orderable: false,
        render: function (data, type, row) {
          //return '<button type="button" class="btn btn-outline-light btn-sm inspect-button" data-bs-toggle="modal" data-bs-target="#driverModal" data-driver-data=\'' + JSON.stringify(data) + '\'>Inspect</button>';
          return '<a href="#" class="link-body-emphasis link-offset-2 link-underline-opacity-25 link-underline-opacity-75-hover inspect-button" data-bs-toggle="modal" data-bs-target="#driverModal" data-driver-data=\'' + JSON.stringify(data) + '\'>Inspect</a>';
        }
      }
    ],
    order: [[6, 'desc'], [3, 'desc']], // sort by date and then by rating
    //order: [[3, 'desc']], // sort by rating
    pageLength: 25,
    lengthMenu: [
      [10, 25, 50, 100, -1],
      ['10', '25', '50', '100', 'All']
    ],
  });
});// end doc ready
