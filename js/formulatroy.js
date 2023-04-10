$(document).ready(function() {

  $('#gamesPlayedTable').DataTable({
    "pageLength": 10,
    "lengthMenu": [ [10, 25, 50, -1], [10, 25, 50, "All"] ],


    //"order": [ 0, 'desc' ],
    "order": [ 5, 'desc' ],


    "columns": [
      // Rating
      { "width": "50px" },
      // Art
      { "width": "80px", orderable: false, searchable: false },
      // Game Title
      null,
      // Platform
      { "width": "150px" },
      // Hours
      { "width": "30px", searchable: false },
      // Completed
      { "width": "100px" }
    ]
  });









});// end doc ready
