$(document).ready(function () {

  // set global variables for license breakpoints, used by several functions
  let platinumBreakpointModern = 1140;
  let goldBreakpointModern = 1020;
  let silverBreakpointModern = 970;
  let bronzeBreakpointModern = 890;

  // global chart variables
  let eloDistributionGraphData = [];
  const minElo = 750;
  const maxElo = 1409;
  const distributionGraphIncrements = 10;

  // helper: return license column text data based on elo rating
  // use an average of the last 5 races for your license
  function getModernLicense(ratingArray, active) {

    // get current and previous average ratings
    // let last5AvgRating = getLast5RatingAverage(ratingArray);
    // let previousLast5AvgRating = getPreviousLast5RatingAverage(ratingArray);

    // get current and previous ratings
    let currentRating = ratingArray[ratingArray.length - 1];
    let previousRating = ratingArray[ratingArray.length - 2];

    // if driver raced in last 3 months, see if the license just changed
    if (active) {

      // helper functions to determine if a license threshold was just crossed
      const checkLicenseBreakpoint = (rating, breakpoint) => {
        return rating >= breakpoint;
      };
      const checkPromoted = (prevRating, currentRating, breakpoint) => {
        return !checkLicenseBreakpoint(prevRating, breakpoint) && checkLicenseBreakpoint(currentRating, breakpoint);
      }
      const checkRelegated = (prevRating, currentRating, breakpoint) => {
        return checkLicenseBreakpoint(prevRating, breakpoint) && !checkLicenseBreakpoint(currentRating, breakpoint);
      }

      // determine if a license threshold was just crossed, and if so, display a modified medal
      if (checkPromoted(previousRating, currentRating, platinumBreakpointModern)) {
        return "<span class='badge medal medal-platinum'><i class='bi bi-caret-up-fill'></i> Platinum <i class='bi bi-caret-up-fill'></i></span>";
      } else if (checkPromoted(previousRating, currentRating, goldBreakpointModern)) {
        return "<span class='badge medal medal-gold'><i class='bi bi-caret-up-fill'></i> Gold <i class='bi bi-caret-up-fill'></i></span>";
      } else if (checkPromoted(previousRating, currentRating, silverBreakpointModern)) {
        return "<span class='badge medal medal-silver'><i class='bi bi-caret-up-fill'></i> Silver <i class='bi bi-caret-up-fill'></i></span>";
      } else if (checkPromoted(previousRating, currentRating, bronzeBreakpointModern)) {
        return "<span class='badge medal medal-bronze'><i class='bi bi-caret-up-fill'></i> Bronze <i class='bi bi-caret-up-fill'></i></span>";
      } else if (checkRelegated(previousRating, currentRating, platinumBreakpointModern)) {
        return "<span class='badge medal medal-gold'><i class='bi bi-caret-down-fill'></i> Gold <i class='bi bi-caret-down-fill'></i></span>";
      } else if (checkRelegated(previousRating, currentRating, goldBreakpointModern)) {
        return "<span class='badge medal medal-silver'><i class='bi bi-caret-down-fill'></i> Silver <i class='bi bi-caret-down-fill'></i></span>";
      } else if (checkRelegated(previousRating, currentRating, silverBreakpointModern)) {
        return "<span class='badge medal medal-bronze'><i class='bi bi-caret-down-fill'></i> Bronze <i class='bi bi-caret-down-fill'></i></span>";
      } else if (checkRelegated(previousRating, currentRating, bronzeBreakpointModern)) {
        return "<span class='badge medal medal-copper'><i class='bi bi-caret-down-fill'></i> Copper <i class='bi bi-caret-down-fill'></i></span>";
      }
    }

    // if there was no license change, or it's been over 3 months, just display the correct medal without arrows
    if (currentRating >= platinumBreakpointModern) {
      return "<span class='badge medal medal-platinum'>Platinum</span>";
    } else if (currentRating >= goldBreakpointModern) {
      return "<span class='badge medal medal-gold'>Gold</span>";
    } else if (currentRating >= silverBreakpointModern) {
      return "<span class='badge medal medal-silver'>Silver</span>";
    } else if (currentRating >= bronzeBreakpointModern) {
      return "<span class='badge medal medal-bronze'>Bronze</span>";
    } else {
      return "<span class='badge medal medal-copper'>Copper</span>";
    }

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
      case "Sahil Mustac":
      case "Tom Lane":
      case "William Snowden":
        flagCode = "gb"; // United Kingdom
        break;

      case "Brandon Gant":
      case "Gilles Lalonde":
      case "Gilles Villeneuve":
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
      case "Ayrton de Lima":
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
      case "Nick Schuetz":
      case "Sachin Sobers":
      case "Maximilian Putrafki":
      case "Jascha Schmidt":
        flagCode = "de"; // Germany
        break;

      case "Jukka Hautanen":
      case "Olli Karjanlahti":
      case "Risto Korpi":
      case "Pekka Ylitalo":
        flagCode = "fi"; // Finland
        break;

      case "Troy Uyan":
      case "Jon Uyan":
      case "Ege Karabacak":
        flagCode = "tr"; // Turkey
        break;

      case "Alain Le Francois":
      case "Eric Moinet":
      case "Joaquin Coudriet":
      case "Tony McOffoven":
        flagCode = "fr"; // France
        break;

      case "Mia Rose":
      case "Rhys Gardiner":
      case "Adrian Rice":
        flagCode = "au"; // Australia
        break;

      case "Vasilis Katerinakis":
      case "Antonis Paparinopoulos":
      case "George Angelidis":
        flagCode = "gr"; // Greece
        break;

      case "Wouter de Bruijn":
      case "Hubert van Gashoven":
      case "Ahmed Abdalla":
      case "Brian van Beusekom":
        flagCode = "nl"; // Netherlands
        break;

      case "Maciej Kasprzyk":
      case "Michael Wojcik":
        flagCode = "pl"; // Poland
        break;

      case "Alexander Nekhoroshkov":
      case "Pavel Chernoburov":
        flagCode = "ru"; // Russia
        break;

      case "Diego Rodrigues":
      case "Martin Esquivel":
        flagCode = "ar"; // Argentina
        break;

      case "Filippo Marazzi":
      case "Alberto Ferrari":
        flagCode = "it"; // Italy
        break;

      case "Magnus Dahlgren":
        flagCode = "se"; // Sweden
        break;

      case "David Jundt":
        flagCode = "ch"; // Switzerland
        break;

      case "Franco Alvarez":
        flagCode = "es"; // Spain
        break;

      case "Oscar Dancourt":
        flagCode = "pe"; // Peru
        break;

      case "Stacie Scotts":
        flagCode = "gb-sct"; // Scotland
        break;

      case "Abdelal ElBakhar":
        flagCode = "eg"; // Egypt
        break;

      case "Scar Pope":
        flagCode = "pg"; // Papua New Guinea
        break;

      case "Yuki Takanashi":
        flagCode = "jp"; // Japan
        break;

      case "Jerry Chen":
        flagCode = "nz"; // New Zealand
        break;

      case "Jaroslav Zacek":
        flagCode = "cz"; // Czech Republic
        break;

      case "Gagan Dev":
        flagCode = "in"; // India
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

  // chart logic //
  // helper: split array of elos into specific elo range buckets for the bar chart
  function groupEloRatings(data, rangeSize) {

    const ranges = {};

    for (let i = minElo; i <= maxElo; i += rangeSize) {
      ranges[`${i}-${i + rangeSize - 1}`] = { count: 0, color: null }; // init count for each elo range
    }

    // loop over the elos and incremeant each elo bar chart range as needed
    data.forEach(elo => {
      for (let i = minElo; i <= maxElo; i += rangeSize) {
        if (elo >= i && elo < i + rangeSize) {
          ranges[`${i}-${i + rangeSize - 1}`].count++;

          // determine color based on breakpoints
          if (elo >= platinumBreakpointModern) {
            ranges[`${i}-${i + rangeSize - 1}`].color = 'rgba(203, 119, 228, 0.75)'; // Platinum
          } else if (elo >= goldBreakpointModern) {
            ranges[`${i}-${i + rangeSize - 1}`].color = 'rgba(255, 217, 0, 0.75)'; // Gold
          } else if (elo >= silverBreakpointModern) {
            ranges[`${i}-${i + rangeSize - 1}`].color = 'rgba(255, 255, 255, 0.75)'; // Silver
          } else if (elo >= bronzeBreakpointModern) {
            ranges[`${i}-${i + rangeSize - 1}`].color = 'rgba(219, 108, 18, 0.75)'; // Bronze
          } else {
            ranges[`${i}-${i + rangeSize - 1}`].color = 'rgba(235, 96, 54, 0.75)'; // Copper
          }
        }
      }
    });
    return ranges;
  }

  // trigger: call the creation of the elo distribution graph after all of the array data is ready
  function drawEloDistributionBarChart() {

    // split array into elo buckets by X range
    const groupedData = groupEloRatings(eloDistributionGraphData, distributionGraphIncrements);

    // set up chart vars
    const labels = Object.keys(groupedData);
    const data = Object.values(groupedData).map(range => range.count);
    const backgroundColors = Object.values(groupedData).map(range => range.color);

    // chart.js: draw bar chart
    const ratingBarChartCanvas = document.getElementById('ratingBarChart').getContext('2d');

    let ratingBarChart = new Chart(ratingBarChartCanvas, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Drivers',
          data: data,
          backgroundColor: backgroundColors,
          //borderColor: "#444444",
          //borderWidth: 1
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
              text: 'Drivers'
            },
          }
        }
      }
    });

  }

  // core logic (table, modal) //
  // event: open up the inspect modal for a particular driver
  $('#cms-strat-modern').on('click', '.inspect-button', function () {

    // load driver data from json "data" parameter in the rowData of the table
    let driver = $(this).data('driverData');
    console.log("Driver Data:", driver);

    // reset the modal html for the new driver
    $('#driverModalLabel').html(getFlag(driver.name) + " " + driver.name);
    $('#modalBody').empty();
    let modalBodyHTML = '<div class="container-fluid"><div class="row">';

    // TO DO chart thingy probably at the top?
    //driver.rating is the array of liiiiiife
    modalBodyHTML += '<p>' + driver.rating + '</p>';
    modalBodyHTML += '<p>' + driver.date + '</p>';
    modalBodyHTML += '<p>' + driver.finishPos + '</p>';
    modalBodyHTML += '<p>' + driver.totalCars + '</p>';

    // left side (stats)
    modalBodyHTML += '<div class="col">';
    modalBodyHTML += '<h4><i class="bi bi-person-vcard-fill"></i> Modern License</h4>';
    modalBodyHTML += '<p>' + getModernLicense(driver.rating, driver.date[driver.date.length - 1]) + '</p>';

    // current, most recent Elo
    let currentRating = driver.rating[driver.rating.length - 1];
    modalBodyHTML += '<p><strong>Elo Rating:</strong> ' + currentRating + ' (' + prettyRatingChange(currentRating - driver.rating[driver.rating.length - 2]) + ')</p>';

    // rest of driver data
    modalBodyHTML += '<p><strong>Ranked Races:</strong> ' + driver.races + '</p>';
    modalBodyHTML += '<p><strong>Last Race:</strong> ' + driver.date[driver.date.length - 1] + '</p>';

    // right side (eligible car classes)
    modalBodyHTML += '</div><div class="col">';
    modalBodyHTML += '<h4><i class="bi bi-trophy-fill"></i> Modern Stats</h4>';
    modalBodyHTML += '<p><strong>Wins:</strong> ' + (driver.finishPos).filter(value => value === 1).length; + '</p>';
    modalBodyHTML += '<p><strong>Podiums:</strong> ' + (driver.finishPos).filter(value => value <= 3 && value != 0).length; + '</p>';
    modalBodyHTML += '<p><strong>Top 10s:</strong> ' + (driver.finishPos).filter(value => value <= 10 && value != 0).length; + '</p>';
    modalBodyHTML += '<p><strong>Avg. Finish:</strong> ' + driver.avgFinishPos + '</p>';









    // modalBodyHTML += '<h4>Modern Class Eligibility</h4>';
    // let licenseLevel = null;
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
    // modalBodyHTML += '</p><p>Anything not listed here, please check with the series admin.</p>';

    // write the results
    modalBodyHTML += '</div></div></div>';
    $('#modalBody').append(modalBodyHTML);

  });

  // init the modern stratification datatable
  $('#cms-strat-modern').DataTable({
    ajax: {
      url: 'driver-jsons/elo-cms-drivers.json',
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
            rowData.driverLicense = getModernLicense(driverData.rating, driverData.active);

            // elo rating and pretty latest change
            let rating = driverData.rating[driverData.rating.length - 1];
            let previousRating = driverData.rating[driverData.rating.length - 2];
            rowData.rating = rating;
            eloDistributionGraphData.push(rating); // add to chart data
            rowData.ratingChange = prettyRatingChange(rating - previousRating);

            // rest of table column data
            rowData.races = driverData.races;
            rowData.wins = (driverData.finishPos).filter(value => value === 1).length;
            rowData.podiums = (driverData.finishPos).filter(value => value <= 3 && value != 0).length;
            rowData.avgFinishPos = driverData.avgFinishPos;
            rowData.lastChangedDate = driverData.date[driverData.date.length - 1];

            // store the entire driver's object for the inspect modal
            rowData.driverData = driverData;

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
      { title: "<i class='bi bi-person-fill'></i> Driver", data: "name", orderable: true, orderSequence: ['asc','desc'], width: "25%" },
      { title: "<i class='bi bi-person-vcard-fill'></i> License", data: "driverLicense", orderable: false },
      { title: "<span title='Active Elo Rating'><i class='bi bi-hash'></i> Rating</span>", data: "rating", orderable: true, orderSequence: ['desc','asc'] },
      { title: "<span title='Latest Elo Change'><i class='bi bi-graph-up-arrow'></i></span>", data: "ratingChange", orderable: false },
      { title: "<span title='Wins'><i class='bi bi-trophy-fill'></i> W</span>", data: "wins", orderable: true, orderSequence: ['desc']},
      { title: "<span title='Podiums'><i class='bi bi-list-ol'></i> P</span>", data: "podiums", orderable: true, orderSequence: ['desc'] },
      { title: "<span title='Races'><i class='bi bi-car-front-fill'></i> R</span>", data: "races", orderable: true, orderSequence: ['desc'] },
      { title: "<span title='Average Finish'><i class='bi bi-flag-fill'></i> Avg</span>", data: "avgFinishPos", orderable: true, orderSequence: ['asc','desc'] },
      { title: "<i class='bi bi-calendar2-check-fill'></i> Updated", data: "lastChangedDate", orderable: true, orderSequence: ['desc','asc'] },
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
    //order: [[9, 'desc'], [3, 'desc']], // sort by date and then by rating
    order: [[3, 'desc']], // sort by rating
    pageLength: 50,
    lengthMenu: [
      [10, 25, 50, 100, -1],
      ['10', '25', '50', '100', 'All']
    ],
    initComplete: function (settings) {
      drawEloDistributionBarChart(); // after the table loads, call the chart draw function
    }
  });

});// end doc ready
