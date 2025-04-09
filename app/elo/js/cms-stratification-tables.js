$(document).ready(function () {

  // set global variables for license breakpoints, used by several functions
  const platinumBreakpointModern = 1140;
  const goldBreakpointModern = 1020;
  const silverBreakpointModern = 970;
  const bronzeBreakpointModern = 890;

  const platinumBreakpointHistoric = 1110;
  const goldBreakpointHistoric = 1020;
  const silverBreakpointHistoric = 970;
  const bronzeBreakpointHistoric = 910;

  // global chart & table variables
  let currentTableMode = "Modern"; // or "Historic"
  let eloDistributionGraphData = [];

  const minEloModern = 750;
  const maxEloModern = 1429;
  const minEloHistoric = 770;
  const maxEloHistoric = 1249;
  let minEloActive = minEloModern;
  let maxEloActive = maxEloModern;

  const distributionGraphIncrements = 10;

  // table and graph containers to be able to be destroyed and recreated
  let activeDatatable = null;
  let activeRatingBarChart = null;

  // helper: return license column text data based on elo rating
  // use an average of the last 5 races for your license
  function getModernLicense(ratingArray, active) {

    // get current and previous average ratings
    // let last5AvgRating = getLast5RatingAverage(ratingArray);
    // let previousLast5AvgRating = getPreviousLast5RatingAverage(ratingArray);

    // get current and previous ratings
    let currentRating = ratingArray[ratingArray.length - 1];
    let previousRating = ratingArray[ratingArray.length - 2];

    // get license breakpoints
    let platinumBreakpointActive = 0;
    let goldBreakpointActive = 0;
    let silverBreakpointActive = 0;
    let bronzeBreakpointActive = 0;
    if (currentTableMode == "Modern") {
      platinumBreakpointActive = platinumBreakpointModern;
      goldBreakpointActive = goldBreakpointModern;
      silverBreakpointActive = silverBreakpointModern;
      bronzeBreakpointActive = bronzeBreakpointModern;
    } else if (currentTableMode == "Historic") {
      platinumBreakpointActive = platinumBreakpointHistoric;
      goldBreakpointActive = goldBreakpointHistoric;
      silverBreakpointActive = silverBreakpointHistoric;
      bronzeBreakpointActive = bronzeBreakpointHistoric;
    } else {
      platinumBreakpointActive = null;
      goldBreakpointActive = null;
      silverBreakpointActive = null;
      bronzeBreakpointActive = null;
    }

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
      if (checkPromoted(previousRating, currentRating, platinumBreakpointActive)) {
        return "<span class='badge medal medal-platinum'><i class='bi bi-caret-up-fill'></i> Platinum <i class='bi bi-caret-up-fill'></i></span>";
      } else if (checkPromoted(previousRating, currentRating, goldBreakpointActive)) {
        return "<span class='badge medal medal-gold'><i class='bi bi-caret-up-fill'></i> Gold <i class='bi bi-caret-up-fill'></i></span>";
      } else if (checkPromoted(previousRating, currentRating, silverBreakpointActive)) {
        return "<span class='badge medal medal-silver'><i class='bi bi-caret-up-fill'></i> Silver <i class='bi bi-caret-up-fill'></i></span>";
      } else if (checkPromoted(previousRating, currentRating, bronzeBreakpointActive)) {
        return "<span class='badge medal medal-bronze'><i class='bi bi-caret-up-fill'></i> Bronze <i class='bi bi-caret-up-fill'></i></span>";
      } else if (checkRelegated(previousRating, currentRating, platinumBreakpointActive)) {
        return "<span class='badge medal medal-gold'><i class='bi bi-caret-down-fill'></i> Gold <i class='bi bi-caret-down-fill'></i></span>";
      } else if (checkRelegated(previousRating, currentRating, goldBreakpointActive)) {
        return "<span class='badge medal medal-silver'><i class='bi bi-caret-down-fill'></i> Silver <i class='bi bi-caret-down-fill'></i></span>";
      } else if (checkRelegated(previousRating, currentRating, silverBreakpointActive)) {
        return "<span class='badge medal medal-bronze'><i class='bi bi-caret-down-fill'></i> Bronze <i class='bi bi-caret-down-fill'></i></span>";
      } else if (checkRelegated(previousRating, currentRating, bronzeBreakpointActive)) {
        return "<span class='badge medal medal-copper'><i class='bi bi-caret-down-fill'></i> Copper <i class='bi bi-caret-down-fill'></i></span>";
      }
    }

    // if there was no license change, or it's been over 3 months, just display the correct medal without arrows
    if (currentRating >= platinumBreakpointActive) {
      return "<span class='badge medal medal-platinum'>Platinum</span>";
    } else if (currentRating >= goldBreakpointActive) {
      return "<span class='badge medal medal-gold'>Gold</span>";
    } else if (currentRating >= silverBreakpointActive) {
      return "<span class='badge medal medal-silver'>Silver</span>";
    } else if (currentRating >= bronzeBreakpointActive) {
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

      case "Ahmed Abdalla":
      case "Brian van Beusekom":
      case "Eelco Bussink":
      case "Hubert van Gashoven":
      case "Wouter de Bruijn":
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

    if (currentTableMode == "Modern") {
      minEloActive = minEloModern;
      maxEloActive = maxEloModern;
    } else if (currentTableMode == "Historic") {
      minEloActive = minEloHistoric;
      maxEloActive = maxEloHistoric;
    } else {
      minEloActive = 0;
      maxEloActive = 2500;
    }

    // get license breakpoints
    let platinumBreakpointActive = 0;
    let goldBreakpointActive = 0;
    let silverBreakpointActive = 0;
    let bronzeBreakpointActive = 0;
    if (currentTableMode == "Modern") {
      platinumBreakpointActive = platinumBreakpointModern;
      goldBreakpointActive = goldBreakpointModern;
      silverBreakpointActive = silverBreakpointModern;
      bronzeBreakpointActive = bronzeBreakpointModern;
    } else if (currentTableMode == "Historic") {
      platinumBreakpointActive = platinumBreakpointHistoric;
      goldBreakpointActive = goldBreakpointHistoric;
      silverBreakpointActive = silverBreakpointHistoric;
      bronzeBreakpointActive = bronzeBreakpointHistoric;
    } else {
      platinumBreakpointActive = null;
      goldBreakpointActive = null;
      silverBreakpointActive = null;
      bronzeBreakpointActive = null;
    }

    const ranges = {};

    for (let i = minEloActive; i <= maxEloActive; i += rangeSize) {
      ranges[`${i}-${i + rangeSize - 1}`] = { count: 0, color: null }; // init count for each elo range
    }

    // loop over the elos and incremeant each elo bar chart range as needed
    data.forEach(elo => {
      for (let i = minEloActive; i <= maxEloActive; i += rangeSize) {
        if (elo >= i && elo < i + rangeSize) {
          ranges[`${i}-${i + rangeSize - 1}`].count++;

          // determine color based on breakpoints
          if (elo >= platinumBreakpointActive) {
            ranges[`${i}-${i + rangeSize - 1}`].color = 'rgba(203, 119, 228, 0.75)'; // Platinum
          } else if (elo >= goldBreakpointActive) {
            ranges[`${i}-${i + rangeSize - 1}`].color = 'rgba(255, 217, 0, 0.75)'; // Gold
          } else if (elo >= silverBreakpointActive) {
            ranges[`${i}-${i + rangeSize - 1}`].color = 'rgba(255, 255, 255, 0.75)'; // Silver
          } else if (elo >= bronzeBreakpointActive) {
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

    activeRatingBarChart = new Chart(ratingBarChartCanvas, {
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
  $('#cms-strat-table').on('click', '.inspect-button', function () {

    // load driver data from json "data" parameter in the rowData of the table
    //console.log("Driver Data:", driver);
    let driver = $(this).data('driverData');

    // reset the modal html for the new driver
    $('#driverModalLabel').html(getFlag(driver.name) + " " + driver.name);
    $('#modalBody').empty();
    let modalBodyHTML = '<div class="container-fluid"><h4><i class="bi bi-graph-up-arrow"></i> ' + currentTableMode + ' Rating Over Time</h4>';

    // elo rating over time chart container
    modalBodyHTML += '<div class="row"><div class="col"><canvas id="driverEloOverTimeChart"></canvas></div></div>';

    // left side (rating and activity)
    modalBodyHTML += '<div class="row mt-4"><div class="col">';
    modalBodyHTML += '<h4><i class="bi bi-person-vcard-fill"></i> ' + currentTableMode + ' License</h4>';
    modalBodyHTML += '<p>' + getModernLicense(driver.rating, driver.date[driver.date.length - 1]) + '</p>';

    // current, most recent Elo
    let currentRating = driver.rating[driver.rating.length - 1];
    modalBodyHTML += '<p><strong>Rating:</strong> ' + currentRating + ' (' + prettyRatingChange(currentRating - driver.rating[driver.rating.length - 2]) + ')</p>';

    // activity data
    if (driver.active == 1) {
      modalBodyHTML += '<p><strong>Status:</strong> <span class="arrow-green">Active</p>';
    } else {
      modalBodyHTML += '<p><strong>Status:</strong> <span class="arrow-red">Inactive</span></p>';
    }
    modalBodyHTML += '<p><strong>Last Race:</strong> ' + driver.date[driver.date.length - 1] + '</p>';

    // right side (race stats)
    modalBodyHTML += '</div><div class="col">';
    modalBodyHTML += '<h4><i class="bi bi-trophy-fill"></i> ' + currentTableMode + ' Stats</h4>';

    let wins = (driver.finishPos).filter(value => value === 1).length;
    let podiums = (driver.finishPos).filter(value => value <= 3 && value != 0).length;
    let top10s = (driver.finishPos).filter(value => value <= 10 && value != 0).length;

    if (wins == 1) {
      modalBodyHTML += '<p><strong>' + wins + '</strong> Win</p>';
    } else if (wins > 1) {
      modalBodyHTML += '<p><strong>' + wins + '</strong> Wins</p>';
    }
    if (podiums == 1) {
      modalBodyHTML += '<p><strong>' + podiums + '</strong> Podium</p>';
    } else if (podiums > 1) {
      modalBodyHTML += '<p><strong>' + podiums + '</strong> Podiums</p>';
    }
    if (top10s == 1) {
      modalBodyHTML += '<p><strong>' + top10s + '</strong> Top 10</p>';
    } else if (top10s > 1) {
      modalBodyHTML += '<p><strong>' + top10s + '</strong> Top 10s</p>';
    }
    if (driver.races == 1) {
      modalBodyHTML += '<p><strong>' + driver.races + '</strong> Ranked Race</p>';
    } else {
      modalBodyHTML += '<p><strong>' + driver.races + '</strong> Ranked Races</p>';
    }

    modalBodyHTML += '<p><strong>' + driver.avgFinishPos + '</strong> Avg. Finish</p>';

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

    // modalBodyHTML += '</p><p>Anything not listed here, please check with the series admin.</p>';

    // write the results
    modalBodyHTML += '</div></div></div>';
    $('#modalBody').append(modalBodyHTML);

    // after the modal html is all set, generate the elo rating over time chart
    let platinumBreakpointActive = 0;
    let goldBreakpointActive = 0;
    let silverBreakpointActive = 0;
    let bronzeBreakpointActive = 0;

    if (currentTableMode == "Modern") {
      platinumBreakpointActive = platinumBreakpointModern;
      goldBreakpointActive = goldBreakpointModern;
      silverBreakpointActive = silverBreakpointModern;
      bronzeBreakpointActive = bronzeBreakpointModern;
    } else if (currentTableMode == "Historic") {
      platinumBreakpointActive = platinumBreakpointHistoric;
      goldBreakpointActive = goldBreakpointHistoric;
      silverBreakpointActive = silverBreakpointHistoric;
      bronzeBreakpointActive = bronzeBreakpointHistoric;
    } else {
      platinumBreakpointActive = null;
      goldBreakpointActive = null;
      silverBreakpointActive = null;
      bronzeBreakpointActive = null;
    }

    let ctx = document.getElementById('driverEloOverTimeChart').getContext('2d');
    let driverEloOverTimeChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: driver.date,
        datasets: [
          {
            label: 'Driver Rating',
            data: driver.rating,
            borderColor: 'rgba(54, 162, 235, 0.8)',
            fill: false,
            pointHoverRadius: 7,
            pointHoverBackgroundColor: 'rgba(54, 162, 235, 0.8)',
          },
          {
            label: 'Platinum Line',
            data: driver.date.map(() => platinumBreakpointActive),
            borderColor: 'rgba(203, 119, 228, 0.75)',
            borderWidth: 1,
            borderDash: [10, 10],
            pointRadius: 0,
            fill: false,
          },
          {
            label: 'Gold Line',
            data: driver.date.map(() => goldBreakpointActive),
            borderColor: 'rgba(255, 217, 0, 0.75)',
            borderWidth: 1,
            borderDash: [10, 10],
            pointRadius: 0,
            fill: false,
          },
          {
            label: 'Silver Line',
            data: driver.date.map(() => silverBreakpointActive),
            borderColor: 'rgba(255, 255, 255, 0.75)',
            borderWidth: 1,
            borderDash: [10, 10],
            pointRadius: 0,
            fill: false,
          },
          {
            label: 'Bronze Line',
            data: driver.date.map(() => bronzeBreakpointActive),
            borderColor: 'rgba(219, 108, 18, 0.75)',
            borderWidth: 1,
            borderDash: [10, 10],
            pointRadius: 0,
            fill: false,
          },
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: false
          }
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            // build tooltip contents when hovering over an elo
            callbacks: {
              title: function (context) {

                // see if this context has a label (should only be the elo rating, not the license breakpoints)
                // the ? question mark is for optional chaining, which allows safe access to
                // nested properties without causing an error if an intermediate property is null or undefined
                let label = context[0]?.label;
                if (label !== undefined) {
                  return 'Date: ' + label;
                }

              },
              label: function (context) {

                let index = context.dataIndex;
                let rating = driver.rating[index];
                let finishPos = driver.finishPos[index];
                let totalCars = driver.totalCars[index];

                return [
                  'Rating: ' + rating,
                  'Position: ' + finishPos + ' of ' + totalCars
                ];
              }
            },
            filter: function (tooltipItem) {
              return tooltipItem.datasetIndex === 0; // filter out tooltips for dashed lines
            }
          },
        }
      }
    });
  });

  // event: switch the stratification table (modern or historic)
  $('input[name="stratLicenseSelector"]').on('change', function () {

    activeDatatable.destroy(); // datatable.js destroy()
    activeRatingBarChart.destroy(); // chart.js destroy()

    currentTableMode = $('input[name="stratLicenseSelector"]:checked').val();
    initStratTable(currentTableMode);

  });

  // helper: generate the stratification datatable from json
  function initStratTable(licenseToDisplay) {

    eloDistributionGraphData = []; // reset the global var for bar chart

    // strat table vars
    let jsonUrl = "";
    switch (licenseToDisplay) {
      case "Modern":
        jsonUrl = "driver-jsons/elo-cms-drivers-modern.json";
        break;

      case "Historic":
        jsonUrl = "driver-jsons/elo-cms-drivers-historic.json";
        break;

      default:
        jsonUrl = null;
        break;
    }

    // use the json file to generate the datatables display
    activeDatatable = $('#cms-strat-table').DataTable({
      ajax: {
        url: jsonUrl,
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
              if (driverData.active == 1) {
                rowData.ratingChange = prettyRatingChange(rating - previousRating);
              } else {
                rowData.ratingChange = "";
              }

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
          //console.log(data);
          return data;
        }
      },
      responsive: true,
      columns: [
        { title: "", data: "flagImage", orderable: false, width: "20px" },
        { title: "<i class='bi bi-person-fill'></i> Driver", data: "name", responsivePriority: 5, orderable: true, orderSequence: ['asc', 'desc'], width: "25%" },
        { title: "<i class='bi bi-person-vcard-fill'></i> License", data: "driverLicense", responsivePriority: 6, orderable: false },
        { title: "<span title='Active Elo Rating'><i class='bi bi-hash'></i> Rating</span>", responsivePriority: 5, data: "rating", orderable: true, orderSequence: ['desc', 'asc'] },
        { title: "<span title='Latest Elo Change'><i class='bi bi-graph-up-arrow'></i></span>", data: "ratingChange", orderable: false },
        { title: "<span title='Wins'><i class='bi bi-trophy-fill'></i> W</span>", data: "wins", orderable: true, orderSequence: ['desc'] },
        { title: "<span title='Podiums'><i class='bi bi-list-ol'></i> P</span>", data: "podiums", orderable: true, orderSequence: ['desc'] },
        { title: "<span title='Races'><i class='bi bi-car-front-fill'></i> R</span>", data: "races", orderable: true, orderSequence: ['desc'] },
        { title: "<span title='Average Finish'><i class='bi bi-flag-fill'></i> Avg</span>", data: "avgFinishPos", orderable: true, orderSequence: ['asc', 'desc'] },
        { title: "<i class='bi bi-calendar2-check-fill'></i> Updated", data: "lastChangedDate", orderable: true, orderSequence: ['desc', 'asc'] },
        {
          title: "<i class='bi bi-search'></i> Details",
          data: "driverData",
          responsivePriority: 5,
          orderable: false,
          render: function (data, type, row) {
            return '<a href="#" class="link-body-emphasis link-offset-2 link-underline-opacity-25 link-underline-opacity-75-hover inspect-button" data-bs-toggle="modal" data-bs-target="#driverModal" data-driver-data=\'' + JSON.stringify(data) + '\'>Inspect</a>';
          }
        }
      ],
      //order: [[9, 'desc'], [3, 'desc']], // sort by date and then by rating (used for recent race screenshots)
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

  }// end initStratTable()

  // on load, write breakpoint variables to visual display within intro text
  $("#js-license-breakpoint-display").append("<div class='col-6'><h5>Modern</h5><p><span class='badge medal medal-platinum'>Platinum</span> " + platinumBreakpointModern + "<br><span class='badge medal medal-gold'>Gold</span> " + goldBreakpointModern + "<br><span class='badge medal medal-silver'>Silver</span> " + silverBreakpointModern + "<br><span class='badge medal medal-bronze'>Bronze</span> " + bronzeBreakpointModern + "</p></div><div class='col-6'><h5>Historic</h5><p><span class='badge medal medal-platinum'>Platinum</span> " + platinumBreakpointHistoric + "<br><span class='badge medal medal-gold'>Gold</span> " + goldBreakpointHistoric + "<br><span class='badge medal medal-silver'>Silver</span> " + silverBreakpointHistoric + "<br><span class='badge medal medal-bronze'>Bronze</span> " + bronzeBreakpointHistoric + "</p></div>");

  // on load, display the default table (modern)
  initStratTable(currentTableMode);

});// end doc ready
