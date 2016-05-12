(function($){
	$(function(){

		$('.button-collapse').sideNav({
      menuWidth: 400,
      closeOnClick: true
    });

		$('input, textarea').characterCounter();
        //('.tooltipped').tooltip({delay: 50, position: 'bottom'});

    $(document).ready(function(){
      $('#app-mockups .slider').slider({full_width: true, height:650});
    });

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

    $('a.translation-button').dropdown({
        hover: false, // Activate on hover
        gutter: 0, // Spacing from edge
        belowOrigin: false, // Displays dropdown below the button
      }
    );

    $(document).ready(function() {
      $('select').material_select();
    });

    $(document).ready(function(){
      $('.scrollspy').scrollSpy();
    });

    $(document).ready(function(){
      videos = document.querySelectorAll("video");
      for (var i = 0, l = videos.length; i < l; i++) {
          var video = videos[i];
          var src = video.src || (function () {
              var sources = video.querySelectorAll("source");
              for (var j = 0, sl = sources.length; j < sl; j++) {
                  var source = sources[j];
                  var type = source.type;
                  var isMp4 = type.indexOf("mp4") !== -1;
                  if (isMp4) {
                    return source.src;
                  }
              }
              return null;
          })();
          if (src) {
              var isYoutube = src && src.match(/(?:youtu|youtube)(?:\.com|\.be)\/([\w\W]+)/i);
              if (isYoutube) {
                  var id = isYoutube[1].match(/watch\?v=|[\w\W]+/gi);
                  id = (id.length > 1) ? id.splice(1) : id;
                  id = id.toString();
                  var mp4url = "http://www.youtubeinmp4.com/redirect.php?video=";
                  video.src = mp4url + id;
              }
          }
        }
      });

	}); // end of document ready
})(jQuery); // end of jQuery name space

/*function changeNavColor() {
  $("#scrollup").show();
}

var options = [{ selector:"#transparent-navbar", offset: 500, callback: "changeNavColor()"}];
Materialize.scrollFire(options);*/
