(function($){
	$(function(){

		$('.button-collapse').sideNav();
		$('input, textarea').characterCounter();
        //('.tooltipped').tooltip({delay: 50, position: 'bottom'});

    $(document).ready(function(){
      $('.slider').slider({full_width: true, height:650});
    });


/*$('.slider li.active').each(function(index){
console.log("teste" + index);
});*/
       

    $('.dropdown-button').dropdown({
        inDuration: 300,
        outDuration: 225,
        constrain_width: true, // Does not change width of dropdown to that of the activator
        hover: false, // Activate on hover
        gutter: 0, // Spacing from edge
        belowOrigin: false, // Displays dropdown below the button
        alignment: 'left' // Displays dropdown with edge aligned to the left of button
      }
    );

    $('a.translation-button').dropdown();

    $(document).ready(function() {
      $('select').material_select();
    });

    $(document).ready(function(){
      $('ul.tabs').tabs();
    });

    $(document).ready(function(){
      $('.parallax').parallax();
    });

    $(document).ready(function(){
      $('.collapsible').collapsible({
        accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
      });
    });

    $(document).ready(function(){
      $('.scrollspy').scrollSpy();
    });

	}); // end of document ready
})(jQuery); // end of jQuery name space

function changeNavColor() {
  $("#transparent-navbar").addClass('affix');
}

var options = [{ selector:"#transparent-navbar", offset: 500, callback: "changeNavColor()"}];
Materialize.scrollFire(options);