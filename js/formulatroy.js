$(document).ready(function() {

  $('#gamesPlayedTable').DataTable({
    "pageLength": 10,
    "lengthMenu": [ [10, 25, 50, -1], [10, 25, 50, "All"] ],
    "columns": [
      // Rating
      { "width": "100px" },
      // Art
      { "width": "100px", orderable: false, searchable: false },
      // Game Title
      null,
      // Platform
      { "width": "100px" },
      // Hours
      { "width": "100px", searchable: false },
      // Completed
      { "width": "150px" }
    ]
  });









});// end doc ready
