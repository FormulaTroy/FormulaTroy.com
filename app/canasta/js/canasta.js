$(document).ready(function () {

	//// New Game Form
  // On page load read select box (snap to state)
  var numOfTeams = $('#numofteams').val();
  if (numOfTeams == 3) {
    $('#teamthreeinput').show();
    $('#teamfourinput').hide();
  } else if (numOfTeams == 4) {
    $('#teamthreeinput').show();
    $('#teamfourinput').show();
  } else {
    $('#teamthreeinput').hide();
    $('#teamfourinput').hide();
  };//end if,else
	// On change read select box (fade to state)
  $('#numofteams').change(function(){
  		var numOfTeams = $(this).val();
      if (numOfTeams == 3) {
        $('#teamthreeinput').fadeIn();
        $('#teamfourinput').fadeOut();
      } else if (numOfTeams == 4) {
        $('#teamthreeinput').fadeIn();
        $('#teamfourinput').fadeIn();
      } else {
        $('#teamthreeinput').fadeOut();
        $('#teamfourinput').fadeOut();
      };//end if,else
  });//end numofteams.change function

  //// Dynamic Tab Index on ALL Forms
  $(":input").each(function (i) {
    $(this).attr('tabindex', i + 1);
  });//end tabindex func

  //// New Game Form Resuming a Game Functions
  // Check on load, snap on or off
  if ( $("#resume-n").prop("checked") == true ) {
    $('.startingvalueinput').each(function(){
      $(this).hide();
      $('.resumetext').hide();
    });
  }; // end if no
  if ( $("#resume-y").prop("checked") == true ) {
    $('.startingvalueinput').each(function(){
      $(this).show();
      $('.resumetext').show();
    });
  }; // end if yes
  // Check on change, fade in or out
  $("#resume-n, #resume-y").change(function(){
    if ( $("#resume-n").prop("checked") == true ) {
      $('.startingvalueinput').each(function(){
        $(this).fadeOut();
        $('.resumetext').fadeOut();
      });
    }; // end if no
    if ( $("#resume-y").prop("checked") == true ) {
      $('.startingvalueinput').each(function(){
        $(this).fadeIn();
        $('.resumetext').fadeIn();
      });
    }; // end if yes
  });

  //// Confirm new game
  $('a.newgamelink').on('click', function () {
    return confirm('Start a new game? All progress will be lost.');
  });//end click confirm

  //// Results Form
  // using jqueryvalidation.org plugin (cdn include script only included on results form)
  // Keep this section last
  $('#resultsform').validate();
  $('#feedbackform').validate();

}); //end ready