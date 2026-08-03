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

  const minEloModern = 800;
  const maxEloModern = 1309;
  const minEloHistoric = 800;
  const maxEloHistoric = 1309;
  let minEloActive = minEloModern;
  let maxEloActive = maxEloModern;

  const distributionGraphIncrements = 10;

  // table and graph containers to be able to be destroyed and recreated
  let activeDatatable = null;
  let activeRatingBarChart = null;
  let showAllDrivers = false;
  let inactiveDriverSearchFilter = null;

  // helper: return license column text data based on elo rating
  // use an average of the last 5 races for your license
  function getModernLicense(driverData) {

    // Current rating is stored as a top-level scalar property
    let currentRating = driverData.rating !== undefined ? driverData.rating : 1000;

    // Get previous rating from racesHistory if available
    let history = driverData.racesHistory || [];
    let previousRating = currentRating; // fallback if 0 or 1 race recorded

    if (history.length >= 2) {
      previousRating = history[history.length - 2].rating;
    } else if (history.length === 1) {
      // Initial baseline ELO before first race
      previousRating = 1000;
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

    // if driver raced in last 3 months, see if the license just changed
    if (driverData.active) {

      // helper functions to determine if a license threshold was just crossed
      const checkLicenseBreakpoint = (rating, breakpoint) => {
        return rating >= breakpoint;
      };
      const checkPromoted = (prevRating, currentRating, breakpoint) => {
        return !checkLicenseBreakpoint(prevRating, breakpoint) && checkLicenseBreakpoint(currentRating, breakpoint);
      };
      const checkRelegated = (prevRating, currentRating, breakpoint) => {
        return checkLicenseBreakpoint(prevRating, breakpoint) && !checkLicenseBreakpoint(currentRating, breakpoint);
      };

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

    // if there was no license change, or it's been over 3 months, display standard medal
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
      case "Alan Smith":
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
      case "Olivier Gervais":
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
      case "Zachary Chauveau":
        flagCode = "fr"; // France
        break;

      case "Adrian Rice":
      case "Matt Wright":
      case "Mia Rose":
      case "Rhys Gardiner":
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

      case "Alberto Ferrari":
      case "Alessandro Smeraldi":
      case "Filippo Marazzi":
        flagCode = "it"; // Italy
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

    // init graph labels for the various elo groupings
    for (let i = minEloActive; i <= maxEloActive; i += rangeSize) {
      let label;
      if (i === minEloActive) {
        label = `${i} & below`;
      } else if (i + rangeSize > maxEloActive) {
        label = `${i} & above`;
      } else {
        label = `${i}-${i + rangeSize - 1}`;
      }
      ranges[label] = { count: 0, color: null };
    }
    const rangeKeys = Object.keys(ranges);

    // loop over the elos securely and add them to their respective buckets
    data.forEach(elo => {

      // clamp the values of elos so the aliens don't go outside the charts
      elo = Math.max(minEloActive, Math.min(maxEloActive, elo));

      for (let key = 0; key < rangeKeys.length; key++) {
        const label = rangeKeys[key];
        const currentRangeStart = parseInt(label);

        // check if this Elo belongs in this bucket range
        if (elo >= currentRangeStart && elo < currentRangeStart + rangeSize) {
          ranges[label].count++;

          // Determine color based on breakpoints
          if (elo >= platinumBreakpointActive) {
            ranges[label].color = 'rgba(203, 119, 228, 0.75)'; // Platinum
          } else if (elo >= goldBreakpointActive) {
            ranges[label].color = 'rgba(255, 217, 0, 0.75)'; // Gold
          } else if (elo >= silverBreakpointActive) {
            ranges[label].color = 'rgba(255, 255, 255, 0.75)'; // Silver
          } else if (elo >= bronzeBreakpointActive) {
            ranges[label].color = 'rgba(219, 108, 18, 0.75)'; // Bronze
          } else {
            ranges[label].color = 'rgba(235, 96, 54, 0.75)'; // Copper
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

    let driver = $(this).data('driverData');
    let history = driver.racesHistory || [];

    // reset the modal html for the new driver
    $('#driverModalLabel').html(getFlag(driver.name) + " " + driver.name);
    $('#modalBody').empty();
    let modalBodyHTML = '';

    // elo rating over time chart container
    modalBodyHTML += '<div class="row align-items-center mb-2">';
    modalBodyHTML += '<div class="col"><h4 class="m-0"><i class="bi bi-graph-up-arrow"></i> ' + currentTableMode + ' Rating Over Time</h4></div>';
    modalBodyHTML += '<div class="col-auto"><button id="btn-toggle-history" class="btn btn-outline-primary btn-sm">Show Full History</button></div>';
    modalBodyHTML += '</div>';
    modalBodyHTML += '<div class="row"><div class="col"><canvas id="driverEloOverTimeChart"></canvas></div></div>';

    // left side (rating and activity)
    modalBodyHTML += '<div class="row mt-4"><div class="col">';
    modalBodyHTML += '<h4><i class="bi bi-person-vcard-fill"></i> ' + currentTableMode + ' License</h4>';
    modalBodyHTML += '<p>' + getModernLicense(driver) + '</p>';

    // current, most recent Elo
    let currentRating = driver.rating !== undefined ? driver.rating : 1000;
    let previousRating = 1000;

    if (history.length >= 2) {
      previousRating = history[history.length - 2].rating;
    } else if (history.length === 1) {
      previousRating = 1000;
    }

    if (driver.active === 1) {
      modalBodyHTML += '<p><strong>Rating:</strong> ' + currentRating + ' (' + prettyRatingChange(currentRating - previousRating) + ')</p>';
    } else {
      modalBodyHTML += '<p><strong>Rating:</strong> ' + currentRating + '</p>';
    }

    // activity data
    if (driver.active == 1) {
      modalBodyHTML += '<p><strong>Status:</strong> <span class="arrow-green">Active</span></p>';
    } else if (driver.visible === 1) {
      modalBodyHTML += '<p><strong>Status:</strong> <span class="">Recently Active</span></p>';
    } else {
      modalBodyHTML += '<p><strong>Status:</strong> <span class="arrow-red">Inactive</span></p>';
    }

    let lastRaceDate = history.length > 0 ? history[history.length - 1].date : "N/A";
    modalBodyHTML += '<p><strong>Last Race:</strong> ' + lastRaceDate + '</p>';

    // right side (race stats calculated from racesHistory)
    modalBodyHTML += '</div><div class="col">';
    modalBodyHTML += '<h4><i class="bi bi-trophy-fill"></i> ' + currentTableMode + ' Stats</h4>';

    let wins = history.filter(race => race.finishPos === 1).length;
    let podiums = history.filter(race => race.finishPos >= 1 && race.finishPos <= 3).length;
    let top10s = history.filter(race => race.finishPos >= 1 && race.finishPos <= 10).length;
    let totalRaces = history.length;

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
    if (totalRaces == 1) {
      modalBodyHTML += '<p><strong>' + totalRaces + '</strong> Ranked Race</p>';
    } else {
      modalBodyHTML += '<p><strong>' + totalRaces + '</strong> Ranked Races</p>';
    }

    modalBodyHTML += '<p><strong>' + (driver.avgFinishPos || "N/A") + '</strong> Avg. Finish</p>';

    // write the results
    modalBodyHTML += '</div></div></div>';
    $('#modalBody').append(modalBodyHTML);

    // after the modal html is set, compute breakpoints
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

    // slice racesHistory array for chart
    const recentRaceAmount = 50;
    let isShowingFullHistory = history.length <= recentRaceAmount;

    function getChartData(showAll) {
      let slice = (showAll || history.length <= recentRaceAmount) ? history : history.slice(-recentRaceAmount);

      // Extract arrays from history
      let dates = slice.map(race => race.date);
      let ratings = slice.map(race => race.rating);
      let finishPos = slice.map(race => race.finishPos);
      let totalCars = slice.map(race => race.totalCars);

      // If viewing full history, prepend the initial 1000 rating baseline
      if (showAll || history.length <= recentRaceAmount) {
        dates.unshift(dates.length > 0 ? dates[0] : 'Start');
        ratings.unshift(1000);
        finishPos.unshift('N/A');
        totalCars.unshift('N/A');
      }

      return { dates, ratings, finishPos, totalCars };
    }

    let activeChartData = getChartData(isShowingFullHistory);

    // hide toggle button if driver has 50 or fewer races overall
    if (history.length <= recentRaceAmount) {
      $('#btn-toggle-history').hide();
    } else {
      $('#btn-toggle-history').text('Show Full History (' + history.length + ' races)');
    }

    let ctx = document.getElementById('driverEloOverTimeChart').getContext('2d');
    let driverEloOverTimeChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: activeChartData.dates,
        datasets: [
          {
            label: 'Driver Rating',
            data: activeChartData.ratings,
            borderColor: 'rgba(54, 162, 235, 0.8)',
            fill: false,
            pointHoverRadius: 7,
            pointHoverBackgroundColor: 'rgba(54, 162, 235, 0.8)',
          },
          {
            label: 'Platinum Line',
            data: activeChartData.dates.map(() => platinumBreakpointActive),
            borderColor: 'rgba(203, 119, 228, 0.75)',
            borderWidth: 1,
            borderDash: [10, 10],
            pointRadius: 0,
            fill: false,
          },
          {
            label: 'Gold Line',
            data: activeChartData.dates.map(() => goldBreakpointActive),
            borderColor: 'rgba(255, 217, 0, 0.75)',
            borderWidth: 1,
            borderDash: [10, 10],
            pointRadius: 0,
            fill: false,
          },
          {
            label: 'Silver Line',
            data: activeChartData.dates.map(() => silverBreakpointActive),
            borderColor: 'rgba(255, 255, 255, 0.75)',
            borderWidth: 1,
            borderDash: [10, 10],
            pointRadius: 0,
            fill: false,
          },
          {
            label: 'Bronze Line',
            data: activeChartData.dates.map(() => bronzeBreakpointActive),
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
            callbacks: {
              title: function (context) {
                let label = context[0]?.label;
                if (label !== undefined) {
                  return 'Date: ' + label;
                }
              },
              label: function (context) {
                let index = context.dataIndex;
                let rating = activeChartData.ratings[index];
                let finishPos = activeChartData.finishPos[index];
                let totalCars = activeChartData.totalCars[index];

                // Baseline initial entry
                if (finishPos === 'N/A') {
                  return [
                    'Rating: ' + rating,
                    'Initial Starting Rating'
                  ];
                }

                // Calculate plain-text ELO change for canvas rendering
                let eloChangeText = '';
                if (index > 0) {
                  let previousRating = activeChartData.ratings[index - 1];
                  let diff = rating - previousRating;

                  if (diff > 0) {
                    eloChangeText = ' (▲ +' + diff + ')';
                  } else if (diff < 0) {
                    eloChangeText = ' (▼ ' + diff + ')';
                  } else {
                    eloChangeText = ' (=)';
                  }
                }

                return [
                  'Rating: ' + rating + eloChangeText,
                  'Position: ' + finishPos + ' of ' + totalCars
                ];
              }
            },
            filter: function (tooltipItem) {
              return tooltipItem.datasetIndex === 0;
            }
          },
        }
      }
    });

    // Event Handler: Expand / Collapse Rating History
    $('#btn-toggle-history').off('click').on('click', function () {
      isShowingFullHistory = !isShowingFullHistory;
      activeChartData = getChartData(isShowingFullHistory);

      driverEloOverTimeChart.data.labels = activeChartData.dates;
      driverEloOverTimeChart.data.datasets[0].data = activeChartData.ratings;
      driverEloOverTimeChart.data.datasets[1].data = activeChartData.dates.map(() => platinumBreakpointActive);
      driverEloOverTimeChart.data.datasets[2].data = activeChartData.dates.map(() => goldBreakpointActive);
      driverEloOverTimeChart.data.datasets[3].data = activeChartData.dates.map(() => silverBreakpointActive);
      driverEloOverTimeChart.data.datasets[4].data = activeChartData.dates.map(() => bronzeBreakpointActive);

      driverEloOverTimeChart.update();

      if (isShowingFullHistory) {
        $(this).text('Show Last 50 Races');
      } else {
        $(this).text('Show Full History (' + history.length + ' races)');
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

    // custom DataTables search filter for inactive driver visibility
    showAllDrivers = false;
    if (inactiveDriverSearchFilter) {
      $.fn.dataTable.ext.search = $.fn.dataTable.ext.search.filter(function (searchFn) {
        return searchFn !== inactiveDriverSearchFilter;
      });
    }

    inactiveDriverSearchFilter = function (settings, data, dataIndex, rowData) {
      if (showAllDrivers) return true;
      // only active drivers by default
      return rowData.visible !== 0;
    };

    $.fn.dataTable.ext.search.push(inactiveDriverSearchFilter);

    // use the json file to generate the datatables display
    activeDatatable = $('#cms-strat-table').DataTable({
      dom: 'Bfrtip',
      // export to excel / csv buttons, show all drivers button
      buttons: [
        {
          text: '<i class="bi bi-eye"></i> Show Inactive',
          className: 'btn btn-outline-secondary btn-sm me-2',
          action: function (e, dt, node, config) {
            showAllDrivers = !showAllDrivers;
            if (showAllDrivers) {
              this.text('<i class="bi bi-eye-slash"></i> Hide Inactive');
            } else {
              this.text('<i class="bi bi-eye"></i> Show Inactive');
            }
            dt.draw();
          }
        },
        {
          extend: 'excelHtml5',
          text: '<i class="bi bi-file-earmark-excel"></i> Excel',
          className: 'btn btn-success btn-sm me-2',
          exportOptions: {
            // exclude the 'Flag' (index 0), 'Rating Change' (index 4) and 'Details' (index 10) columns from export
            columns: [1, 2, 3, 5, 6, 7, 8, 9]
          }
        },
        {
          extend: 'csvHtml5',
          text: '<i class="bi bi-filetype-csv"></i> CSV',
          className: 'btn btn-secondary btn-sm',
          exportOptions: {
            columns: [1, 2, 3, 5, 6, 7, 8, 9],
            format: {
              body: function (data, row, column, node) {
                // remove HTML elements to output clean text for License/Rating change columns
                return typeof data === 'string' ? data.replace(/<[^>]*>/g, '').trim() : data;
              }
            }
          }
        }
      ],
      // load the elo json file
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
              var history = driverData.racesHistory || [];

              // Flag, name, and license
              rowData.flagImage = getFlag(driverData.name);
              rowData.name = driverData.name;
              rowData.driverLicense = getModernLicense(driverData);

              // Rating and Rating Change
              let rating = driverData.rating !== undefined ? driverData.rating : 1000;
              rowData.rating = rating;
              eloDistributionGraphData.push(rating);

              if (driverData.active === 1 && history.length >= 2) {
                let currentRaceRating = history[history.length - 1].rating;
                let previousRaceRating = history[history.length - 2].rating;
                rowData.ratingChange = prettyRatingChange(currentRaceRating - previousRaceRating);
              } else if (driverData.active === 1 && history.length === 1) {
                // First race comparison against default baseline ELO (1000)
                rowData.ratingChange = prettyRatingChange(history[0].rating - 1000);
              } else {
                rowData.ratingChange = "";
              }

              // Stats computed from racesHistory
              rowData.races = history.length;
              rowData.wins = history.filter(race => race.finishPos === 1).length;
              rowData.podiums = history.filter(race => race.finishPos >= 1 && race.finishPos <= 3).length;
              rowData.avgFinishPos = driverData.avgFinishPos;

              // Last race date
              rowData.lastChangedDate = history.length > 0 ? history[history.length - 1].date : "N/A";

              // Visibility flag
              rowData.visible = driverData.visible !== undefined ? driverData.visible : 1;

              // Full object pass-through for modals/inspection
              rowData.driverData = driverData;

              data.push(rowData);
            }
          }
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
      order: [[3, 'desc']],
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
