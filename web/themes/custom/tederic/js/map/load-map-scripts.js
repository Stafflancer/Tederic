(function($, Drupal, drupalSettings) {
  
  // var added = false;
  // $(document).scroll(function() {
  //   if (!added && $(document).scrollTop()) {
      
      $.getScript(location.origin + '/themes/custom/tederic/js/leaflet/leaflet.js')
      .done(function( script, textStatus ) {

        $.getScript(location.origin + '/themes/custom/tederic/js/leaflet/leaflet.responsive.popup.js')
          .done(function( script, textStatus ) {

            $.getScript(location.origin + '/themes/custom/tederic/js/imgViewer2/dist/imgViewer2.min.js')

              .done(function( script, textStatus ) {
                $.getScript(location.origin + '/themes/custom/tederic/js/map/tederic-map.js');
                $('head').append('<link rel="stylesheet" href="' + location.origin + '/themes/custom/tederic/js/imgViewer2/dist/imgViewer2.min.css" type="text/css" />');

                $('head').append('<link rel="stylesheet" href="' + location.origin + '/themes/custom/tederic/js/leaflet/leaflet.css" type="text/css" />');

                $('head').append('<link rel="stylesheet" href="' + location.origin + '/themes/custom/tederic/js/leaflet/leaflet.responsive.popup.css" type="text/css" />');

                $('head').append('<link rel="stylesheet" href="' + location.origin + '/themes/custom/tederic/css/tederic-map.css" type="text/css" />');
              });

          });
        
      });

  //     added = true;
  //   }
  // });

})(jQuery, Drupal, drupalSettings);
