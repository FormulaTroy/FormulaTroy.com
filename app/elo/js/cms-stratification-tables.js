$(document).ready(function () {

  // helper: return license column text data based on elo rating
  function getLicense(rating) {
    if (rating <= 899) {
      return "<span style='color:copper;'><i class='bi bi-reception-0'></i> Copper</span>";
    } else if (rating <= 1099) {
      return "<span style='color:bronze;'><i class='bi bi-reception-1'></i> Bronze</span>";
    } else if (rating <= 1299) {
      return "<span style='color:silver;'><i class='bi bi-reception-2'></i> Silver</span>";
    } else if (rating <= 1499) {
      return "<span style='color:gold;'><i class='bi bi-reception-3'></i> Gold</span>";
    } else {
      return "<span style='color:platinum;'><i class='bi bi-reception-4'></i> Platinum</span>";
    }
  }

  // helper: return different flags based on the driver's name
  // note: this is decouple from the json so it doesn't have to be re-entered if the json is regenerated
  function getFlag(name) {
    let flagCode = "xx"
    switch (name) {
      case "Matthew Overton":
        flagCode = "ca"
        break;
      default:
        flagCode = "us"
        break;
    }
    return '<img src="flags/' + flagCode + '.png" alt="' + flagCode + '" />';
  }

  // init the modern stratification datatable
  $('#cms-strat-modern').DataTable({
    ajax: {
      url: 'driver-jsons/elo-modern.json',
      dataSrc: function (json) {
        var data = [];
        for (var key in json) {
          if (json.hasOwnProperty(key)) {
            var driverData = json[key];
            var rowData = [
              driverData.name,
              driverData.rating[driverData.rating.length - 1],
              driverData.races,
              driverData.lastChangedDate
            ];

            // add calculated columns (not in original data)
            rowData.flagImage = getFlag(driverData.name);
            rowData.driverClass = getLicense(driverData.rating[driverData.rating.length - 1]);

            data.push(rowData);
          }
        }
        console.log(data);
        return data;
      }
    },
    columns: [
      { title: "Driver" },
      { title: "Rating" },
      { title: "Races" },
      { title: "Updated" },
      { title: "Flag", data: "flagImage" }, // Column for the flag image
      { title: "Class", data: "driverClass" }  // Column for the driver class
    ],
    //Important: Tell datatables which columns are data and which are display.
    columnDefs: [
      {
        targets: [4, 5], // Flag and Class columns (index 4 and 5)
        data: null, // Use the data from the rowData object
        render: function (data, type, row) {
          if (type === 'display') {
            return row[this.data]; // Render the HTML (flag image or class text)
          }
          return data; // For other types (sorting, filtering, etc.), return the original data
        }
      }
    ]
  });
});// end doc ready
