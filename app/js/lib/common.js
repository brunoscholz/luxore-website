(function($){
	$(function(){

		$('.button-collapse').sideNav({
      edge: 'right',
      closeOnClick: true
    });

    function navbarScroll() {
      var y = window.scrollY;
      if (y > 50) {
        $('.lux-header').addClass('shrink');
      } else if (y < 50) {
        $('.lux-header').removeClass('shrink');
      }
    }

    $(document).scroll(function() {
      navbarScroll();
    });

	}); // end of document ready
})(jQuery); // end of jQuery name space