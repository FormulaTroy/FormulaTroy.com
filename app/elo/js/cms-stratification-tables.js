$(document).ready(function () {

  // helper: return license column text data based on elo rating
  // Licensed Results
  // Copper (   0- 999)
  // Bronze (1000-1199)
  // Silver (1200-1299)
  //   Gold (1300-1499)
  //   Plat (1500+    )
  function getLicense(rating) {
    if (rating <= 999) {
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

            // map
            rowData.name = driverData.name;
            rowData.rating = driverData.rating[driverData.rating.length - 1];
            rowData.races = driverData.races;
            rowData.lastChangedDate = driverData.lastChangedDate;

            rowData.flagImage = getFlag(driverData.name);
            rowData.driverClass = getLicense(driverData.rating[driverData.rating.length - 1]);

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
      { title: "Driver", data: "name", orderable: true, width: "25%" },
      { title: "Class", data: "driverClass", orderable: false },
      { title: "Rating", data: "rating", orderable: true },
      { title: "Races", data: "races", orderable: true },
      { title: "Updated", data: "lastChangedDate", orderable: true }
    ],
    //order: [[5, 'desc'], [3, 'desc']], // sort by date and then by rating
    order: [[3, 'desc']], // sort by rating
    pageLength: 25,
    lengthMenu: [
        [ 10, 25, 50, 100, -1 ], // Values: -1 means "All"
        [ '10', '25', '50', '100', 'All' ] // Display text
    ],
  });
});// end doc ready
