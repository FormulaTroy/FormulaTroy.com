$(document).ready(function () {

  // set global variables for license breakpoints, used by several functions
  let platinumBreakpoint = 1130;
  let goldBreakpoint = 1030;
  let silverBreakpoint = 970;
  let bronzeBreakpoint = 920;

  // helper: return license column text data based on elo rating
  // use an average of the last 5 races for your license
  function getModernLicense(ratingArray) {

    // get current and previous average ratings
    // let last5AvgRating = getLast5RatingAverage(ratingArray);
    // let previousLast5AvgRating = getPreviousLast5RatingAverage(ratingArray);

    // get current and previous ratings
    let currentRating = ratingArray[ratingArray.length - 1];
    let previousRating = ratingArray[ratingArray.length - 2];

    // helper functions to determine if a license threshold was just crossed
    const checkBreakpoint = (rating, breakpoint) => {
      return rating >= breakpoint;
    };
    const checkCrossed = (prevRating, currentRating, breakpoint) => {
      return !checkBreakpoint(prevRating, breakpoint) && checkBreakpoint(currentRating, breakpoint);
    }
    const checkDropped = (prevRating, currentRating, breakpoint) => {
      return checkBreakpoint(prevRating, breakpoint) && !checkBreakpoint(currentRating, breakpoint);
    }

    // determine if a license threshold was just crossed, and if so, display a modified medal
    if (checkCrossed(previousRating, currentRating, platinumBreakpoint)) {
      return "<span class='badge medal medal-platinum'><i class='bi bi-caret-up-fill'></i> Platinum <i class='bi bi-caret-up-fill'></i></span>";
    } else if (checkCrossed(previousRating, currentRating, goldBreakpoint)) {
      return "<span class='badge medal medal-gold'><i class='bi bi-caret-up-fill'></i> Gold <i class='bi bi-caret-up-fill'></i></span>";
    } else if (checkCrossed(previousRating, currentRating, silverBreakpoint)) {
      return "<span class='badge medal medal-silver'><i class='bi bi-caret-up-fill'></i> Silver <i class='bi bi-caret-up-fill'></i></span>";
    } else if (checkCrossed(previousRating, currentRating, bronzeBreakpoint)) {
      return "<span class='badge medal medal-bronze'><i class='bi bi-caret-up-fill'></i> Bronze <i class='bi bi-caret-up-fill'></i></span>";
    } else if (checkDropped(previousRating, currentRating, platinumBreakpoint)) {
      return "<span class='badge medal medal-gold'><i class='bi bi-caret-down-fill'></i> Gold <i class='bi bi-caret-down-fill'></i></span>";
    } else if (checkDropped(previousRating, currentRating, goldBreakpoint)) {
      return "<span class='badge medal medal-silver'><i class='bi bi-caret-down-fill'></i> Silver <i class='bi bi-caret-down-fill'></i></span>";
    } else if (checkDropped(previousRating, currentRating, silverBreakpoint)) {
      return "<span class='badge medal medal-bronze'><i class='bi bi-caret-down-fill'></i> Bronze <i class='bi bi-caret-down-fill'></i></span>";
    } else if (checkDropped(previousRating, currentRating, bronzeBreakpoint)) {
      return "<span class='badge medal medal-copper'><i class='bi bi-caret-down-fill'></i> Copper <i class='bi bi-caret-down-fill'></i></span>";
    }

    // if there was no license change, just display the correct medal without arrows
    if (currentRating >= platinumBreakpoint) {
      return "<span class='badge medal medal-platinum'>Platinum</span>";
    } else if (currentRating >= goldBreakpoint) {
      return "<span class='badge medal medal-gold'>Gold</span>";
    } else if (currentRating >= silverBreakpoint) {
      return "<span class='badge medal medal-silver'>Silver</span>";
    } else if (currentRating >= bronzeBreakpoint) {
      return "<span class='badge medal medal-bronze'>Bronze</span>";
    } else {
      return "<span class='badge medal medal-copper'>Copper</span>";
    }

  }

  // helper: get an average ELO rating over the last 5 races
  function getLast5RatingAverage(ratingArray) {
    if (!Array.isArray(ratingArray) || ratingArray.length <= 1) {
      console.log("getLast5RatingAverage failed with rating array: ");
      console.log(ratingArray);
      return false;
    }

    const numOfRaces = Math.min(5, ratingArray.length);
    let last5Total = 0;

    for (let i = ratingArray.length - numOfRaces; i < ratingArray.length; i++) {
      last5Total += ratingArray[i];
    }

    return last5Total / numOfRaces;
  }

  // helper: get an average ELO rating over the last 5 races, prior to the latest race
  function getPreviousLast5RatingAverage(ratingArray) {
    if (!Array.isArray(ratingArray) || ratingArray.length < 2) {
      console.log("getPreviousLast5RatingAverage failed with rating array: ");
      console.log(ratingArray);
    }

    const previousNumOfRaces = Math.min(5, ratingArray.length - 1);
    let previousLast5Total = 0;
    const startIndex = ratingArray.length - previousNumOfRaces - 1;

    for (let i = startIndex; i < ratingArray.length - 1; i++) {
      previousLast5Total += ratingArray[i];
    }

    return previousLast5Total / previousNumOfRaces;
  }

  // helper: return different flags based on the driver's name
  // note: this is decoupled from the json so it doesn't have to be re-entered if the json is regenerated
  function getFlag(name) {
    let flagCode = "xx";
    switch (name) {

      case "Adam Gray":
      case "Alexander Serraima":
      case "Becky Ely-Clark":
      case "Ben Boorman":
      case "Ben Kesby":
      case "Benjamin Porteous-Heath":
      case "Bradley Sellars":
      case "Cameron Barker":
      case "Cian Pullen":
      case "Craig Pullen":
      case "Daniel Hurlock":
      case "Eelco Bussink":
      case "Luke Mitchell":
      case "Mike Bell":
      case "Oliver Newman":
      case "Robin Moelling":
      case "Tom Lane":
      case "William Snowden":
        flagCode = "gb"; // United Kingdom
        break;

      case "Brandon Gant":
      case "Gilles Lalonde":
      case "James Walker":
      case "John Maher":
      case "Kyle Vesa":
      case "Matthew Overton":
      case "Oliver Day":
      case "Stephen Miller":
      case "Wayne Hutchison":
        flagCode = "ca"; // Canada
        break;

      case "Eduardo Beninca":
      case "Elisio Netto":
      case "Gui Cevert":
      case "Guilherme Bencke":
      case "Luciano Ichazo":
      case "Pedro Crulas Gomes":
      case "Philippe Henrique":
      case "Vinicius de Oliveira":
      case "Vinicius Goncalves":
      case "Willian Schlichting":
        flagCode = "br"; // Brazil
        break;

      case "Timon Soovik":
      case "Alexander Schulz":
      case "Peter Meier":
      case "Sachin Sobers":
      case "Maximilian Putrafki":
      case "Jascha Schmidt":
        flagCode = "de" // Germany
        break;

      case "Troy Uyan":
      case "Jon Uyan":
      case "Ege Karabacak":
        flagCode = "tr"; // Turkey
        break;

      case "Alain Le Francois":
      case "Eric Moinet":
      case "Tony McOffoven":
        flagCode = "fr"; // France
        break;

      case "Mia Rose":
      case "Rhys Gardiner":
      case "Adrian Rice":
        flagCode = "au" // Australia
        break;

      case "Vasilis Katerinakis":
      case "George Angelidis":
        flagCode = "gr" // Greece
        break;

      case "Wouter de Bruijn":
      case "Brian van Beusekom":
        flagCode = "nl" // Netherlands
        break;

      case "Magnus Dahlgren":
        flagCode = "se" // Sweden
        break;

      case "David Jundt":
        flagCode = "ch" // Switzerland
        break;

      case "Oscar Dancourt":
        flagCode = "pe" // Peru
        break;

      case "Scar Pope":
        flagCode = "pg" // Papua New Guinea
        break;

      case "Yuki Takanashi":
        flagCode = "jp" // Japan
        break;

      case "Jerry Chen":
        flagCode = "nz" // New Zealand
        break;

      case "Jaroslav Zacek":
        flagCode = "cz" // Czech Republic
        break;

      case "Filippo Marazzi":
        flagCode = "it" // Italy
        break;

      case "Gagan Dev":
        flagCode = "in" // India
        break;

      case "Diego Rodrigues":
        flagCode = "ar" // Argentina
        break;

      default:
        flagCode = "us"; // United States
        break;
    }

    // HIDE THE STUFF MODE
    //flagCode = "xx";

    return '<span class="fi fi-' + flagCode + '"></span>';
  }

  // helper: take a rating adjustment int and turn it into a display with icons
  function prettyRatingChange(ratingChange) {
    if (ratingChange < 0) {
      return '<i class="bi bi-arrow-down arrow-red"></i>' + Math.abs(ratingChange);
    } else if (ratingChange == 0) {
      return '<i class="bi bi-dash"></i>' + ratingChange;
    } else {
      return '<i class="bi bi-arrow-up arrow-green"></i>' + ratingChange;
    }
  }

  // helper: display badge based on class and suggested color
  function displayClassBadge(carClass, tagColor) {
    return '<span class="badge badge-class-' + tagColor + '">' + carClass + '</span>&nbsp;';
  }

  // event: open up the inspect modal for a particular driver
  $('#cms-strat-modern').on('click', '.inspect-button', function () {

    // load driver data from json
    let driver = $(this).data('driverData');
    console.log("Driver Data:", driver);

    // HIDE THE STUFF MODE
    //driver.name = "driverData.name;";

    // reset the modal html for the new driver
    $('#driverModalLabel').html(getFlag(driver.name) + " " + driver.name);
    $('#modalBody').empty();
    let modalBodyHTML = '<div class="container-fluid"><div class="row">';

    // TO DO chart thingy probably at the top?
    //driver.rating is the array of liiiiiife
    modalBodyHTML += '<p>' + driver.rating + '</p>' + '</div><div class="row">';

    // left side (stats)
    modalBodyHTML += '<div class="col">';
    modalBodyHTML += '<h4>Modern License</h4>';
    modalBodyHTML += '<p>' + getModernLicense(driver.rating) + '</p>';

    // license rating, average Elo rating of last 5 races
    // let last5AvgRating = getLast5RatingAverage(driver.rating);
    // let previousLast5AvgRating = getPreviousLast5RatingAverage(driver.rating)
    // let licenseRating = Math.round(last5AvgRating);
    // let averageRatingChange = Math.round(last5AvgRating - previousLast5AvgRating)
    // modalBodyHTML += '<p><strong>License Rating:</strong> ' + licenseRating + ' (' + prettyRatingChange(averageRatingChange) + ')</p>';

    // current, most recent Elo
    let currentRating = driver.rating[driver.rating.length - 1];
    modalBodyHTML += '<p><strong>Elo Rating:</strong> ' + currentRating + ' (' + prettyRatingChange(currentRating - driver.rating[driver.rating.length - 2]) + ')</p>';

    // rest of driver data
    modalBodyHTML += '<p><strong>Ranked Races:</strong> ' + driver.races + '</p>';
    modalBodyHTML += '<p><strong>Last Race:</strong> ' + driver.lastChangedDate + '</p>';

    // right side (eligible car classes)
    modalBodyHTML += '</div><div class="col">';
    modalBodyHTML += '<h4>Modern Class Eligibility</h4>';
    let licenseLevel = null;
    // Licensed Results
    // Copper (   0-1099)
    // Bronze (1100-1199)
    // Silver (1200-1349)
    //   Gold (1350-1599)
    //   Plat (1600+    )
    // if (currentRating <= 1099) {
    //   licenseLevel = 0; // copper
    // } else if (currentRating <= 1199) {
    //   licenseLevel = 1; // bronze
    // } else if (currentRating <= 1349) {
    //   licenseLevel = 2; // silver
    // } else if (currentRating <= 1599) {
    //   licenseLevel = 3; // gold
    // } else {
    //   licenseLevel = 4; // plat
    // }

    // class displays for each active series
    // colors: red, blue, green, orange, cyan
    // modalBodyHTML += '<h6>Virtual World Sportscar Championship</h6>';
    // modalBodyHTML += '<p>';
    // if (licenseLevel >= 3) {
    //   modalBodyHTML += displayClassBadge("HyperCar Pro","red");
    //   modalBodyHTML += displayClassBadge("LMGT3 Pro","green");
    // } else {
    //   modalBodyHTML += displayClassBadge("HyperCar Am","blue");
    //   modalBodyHTML += displayClassBadge("LMGT3 Am","orange");
    // }
    // modalBodyHTML += '</p>';

    // modalBodyHTML += '<h5>These are broken right now:::</h5>';

    // modalBodyHTML += '<h6>NARS Modern Sportscar Championship</h6>';
    // modalBodyHTML += '<p>';
    // if (licenseLevel == 4) {
    //   modalBodyHTML += displayClassBadge("HyperCar Pro", "red");
    //   modalBodyHTML += displayClassBadge("LMP2", "cyan");
    // } else if (licenseLevel == 3) {
    //   modalBodyHTML += displayClassBadge("HyperCar Pro", "red");
    //   modalBodyHTML += displayClassBadge("LMP2", "cyan");
    //   modalBodyHTML += displayClassBadge("LMGT3 Pro", "green");
    // } else if (licenseLevel == 2 || licenseLevel == 1) {
    //   modalBodyHTML += displayClassBadge("HyperCar Am", "blue");
    //   modalBodyHTML += displayClassBadge("LMP2", "cyan");
    //   modalBodyHTML += displayClassBadge("LMGT3 Am", "orange");
    // } else {
    //   modalBodyHTML += displayClassBadge("LMP2", "cyan");
    //   modalBodyHTML += displayClassBadge("LMGT3 Am", "orange");
    // }
    // modalBodyHTML += '</p>';

    // modalBodyHTML += '<h6>NARS Porsche Cup</h6>';
    // modalBodyHTML += '<p>';
    // if (licenseLevel >= 3) {
    //   modalBodyHTML += displayClassBadge("PCC Pro", "red");
    // } else {
    //   modalBodyHTML += displayClassBadge("PCC Am", "blue");
    // }
    // modalBodyHTML += '</p>';

    // modalBodyHTML += '<h6>NARS Australian TA2</h6>';
    // modalBodyHTML += '<p>';
    // if (licenseLevel == 4) {
    //   modalBodyHTML += displayClassBadge("TA2 Pro", "red");
    // } else if (licenseLevel == 3) {
    //   modalBodyHTML += displayClassBadge("TA2 Pro-Am", "green");
    // } else {
    //   modalBodyHTML += displayClassBadge("TA2 Am", "blue");
    // }
    // modalBodyHTML += '</p>';

    // modalBodyHTML += '<h6>MNRL VP Sportscar Challenge</h6>';
    // modalBodyHTML += '<p>';
    // if (licenseLevel >= 3) {
    //   modalBodyHTML += displayClassBadge("LMP3 Pro", "red");
    //   modalBodyHTML += displayClassBadge("GT4 Pro", "green");
    // } else {
    //   modalBodyHTML += displayClassBadge("LMP3 Am", "blue");
    //   modalBodyHTML += displayClassBadge("GT4 Am", "orange");
    // }
    // modalBodyHTML += '</p>';

    // write the results
    modalBodyHTML += '<p>Anything not listed here, please check with the series admin.</p></div></div></div>';
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
            rowData.driverLicense = getModernLicense(driverData.rating);

            // elo rating and latest change
            let rating = driverData.rating[driverData.rating.length - 1];
            let previousRating = driverData.rating[driverData.rating.length - 2];
            rowData.rating = rating;
            rowData.ratingChange = prettyRatingChange(rating - previousRating);

            // HIDE THE STUFF MODE
            //rowData.name = "driverData.name;"

            // use average ratings over recent races, rather than the last rating
            // let last5AvgRating = getLast5RatingAverage(driverData.rating);
            // let previousLast5AvgRating = getPreviousLast5RatingAverage(driverData.rating)
            // let averageRatingChange = Math.round(last5AvgRating - previousLast5AvgRating)
            // rowData.rating = Math.round(last5AvgRating);
            // rowData.ratingChange = prettyRatingChange(averageRatingChange);

            // rest of table data
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
    //order: [[6, 'desc'], [3, 'desc']], // sort by date and then by rating
    order: [[3, 'desc']], // sort by rating
    pageLength: 50,
    lengthMenu: [
      [10, 25, 50, 100, -1],
      ['10', '25', '50', '100', 'All']
    ],
  });









  // chart testing

  const eloData = [1364, 1355, 1305, 1280, 1251, 1239, 1210, 1194, 1172, 1160, 1139, 1131, 1130, 1127, 1123, 1120, 1117, 1116, 1114, 1113, 1104, 1100, 1100, 1096, 1091, 1087, 1086, 1077, 1075, 1074, 1073, 1070, 1069, 1067, 1066, 1065, 1064, 1056, 1052, 1049, 1039, 1022, 1022, 1022, 1021, 1021, 1019, 1018, 1018, 1018, 1017, 1016, 1014, 1013, 1012, 1012, 1012, 1010, 1010, 1010, 1009, 1009, 1009, 1008, 1006, 1005, 1004, 1002, 1001, 1001, 1000, 999, 999, 999, 999, 998, 996, 996, 996, 996, 996, 995, 994, 994, 994, 994, 993, 992, 992, 991, 991, 991, 990, 990, 989, 989, 989, 988, 988, 987, 987, 987, 986, 985, 985, 985, 984, 984, 984, 984, 983, 983, 983, 981, 981, 980, 979, 979, 977, 976, 975, 971, 971, 970, 968, 968, 968, 967, 965, 965, 965, 963, 961, 960, 959, 959, 958, 955, 954, 954, 951, 950, 944, 940, 937, 933, 933, 932, 931, 930, 930, 930, 929, 925, 923, 922, 916, 914, 914, 911, 907, 906, 905, 905, 898, 897, 895, 886, 884, 871, 865, 844, 834, 825, 822, 808, 799, 789, 773, 699];

  function groupEloRatings(data, rangeSize) {
    const ranges = {};
    const minElo = 770;
    const maxElo = 1370;

    for (let i = minElo; i <= maxElo; i += rangeSize) {
      ranges[`${i}-${i + rangeSize - 1}`] = { count: 0, color: null }; // Store count and color
    }

    data.forEach(elo => {
      for (let i = minElo; i <= maxElo; i += rangeSize) {
        if (elo >= i && elo < i + rangeSize) {
          ranges[`${i}-${i + rangeSize - 1}`].count++;

          // Determine color based on breakpoints
          if (elo >= platinumBreakpoint) {
            ranges[`${i}-${i + rangeSize - 1}`].color = 'rgba(203, 119, 228, 0.75)'; // Platinum (teal)
          } else if (elo >= goldBreakpoint) {
            ranges[`${i}-${i + rangeSize - 1}`].color = 'rgba(255, 217, 0, 0.75)'; // Gold
          } else if (elo >= silverBreakpoint) {
            ranges[`${i}-${i + rangeSize - 1}`].color = 'rgba(255, 255, 255, 0.75)'; // Silver
          } else if (elo >= bronzeBreakpoint) {
            ranges[`${i}-${i + rangeSize - 1}`].color = 'rgba(219, 108, 18, 0.75)'; // Bronze
          } else {
            ranges[`${i}-${i + rangeSize - 1}`].color = 'rgba(235, 96, 54, 0.75)'; // Copper
          }
          break;
        }
      }
    });
    return ranges;
  }

  const groupedData = groupEloRatings(eloData, 10);

  const labels = Object.keys(groupedData);
  const data = Object.values(groupedData).map(range => range.count);
  const backgroundColors = Object.values(groupedData).map(range => range.color); // Array of colors

  const ratingBarChartCanvas = document.getElementById('ratingBarChart').getContext('2d');
  const myChart = new Chart(ratingBarChartCanvas, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Number of Drivers',
        data: data,
        backgroundColor: backgroundColors,
        borderColor: "#cccccc",
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: false,
        }
      },
      scales: {
        x: {
          ticks: {
            display: false
          },
          title: {
            display: true,
            text: 'Elo Ranges'
          }
        },
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Number of Drivers'
          },
        }
      }
    }
  });


  console.log(myChart.options.scales)


















});// end doc ready
