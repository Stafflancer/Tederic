(function($, Drupal, drupalSettings) {

  // $(document).ready(function() {
  //   $('#map-block-img-test').mousemove(function( e ) {
  //     var w = $(this).width();
  //     console.log(w);
  //     var h = $(this).height();
  //     console.log(h);
  //     var offset = $(this).offset();
  //     console.log('x: ' + (((e.pageX - offset.left) * 100) / w) + '; y: ' + (((e.pageY - offset.top) * 100) / h) + ';');
  //     // console.log('x: ' + (e.pageX - offset.left) + '; y: ' + (e.pageY - offset.top) + ';');
  //   });
  // });

  // $(".leaflet-container").bind("mousewheel", function() {
  //   return false;
  // });

  var window_width = $(window).width();
  var mobile_width = 767;

  $.widget("wgm.imgNotes2", $.wgm.imgViewer2, {
    options: {
      /*
      *  Defaault action for addNote callback
      */
      addNote: function(data) {
        var map = this.map,
        loc = this.relposToLatLng(data.x, data.y);

        title_position_class = ' right-side';
        if (data.x < 0.5) {
          title_position_class = ' left-side';
        }

        if (data.note == "\n") {
          var popup = false;
        }
        else {
          var popup = L.responsivePopup({ hasTip: true, autoPan: false}).setContent(data.note);
        }
        
        loc_icon_url = '/themes/custom/tederic/images/map/';
        var loc_icon = 'blue-dot.svg';
        if (data.headquarter) {
          loc_icon = 'red-dot.svg';
        }

        size_class = '';
        if (data.big_icon) {
          size_class = ' big';
        }

        // var icon = L.icon({
        //   iconUrl: loc_icon_url + loc_icon,
        //   iconSize: icon_size,
        //   iconAnchor: [10, 8],
        //   popupAnchor: [0, -16],
        //   shadowUrl: loc_icon_url + loc_icon,
        //   shadowSize: icon_size,
        //   shadowAnchor: [10, 8],
        // });
        
        var marker = L.marker(loc, {
          icon: new L.DivIcon({
                  className: 'marker-wrap',
                  html: '<img class="marker-icon' + size_class + '" src="' + loc_icon_url + loc_icon + '"/>'+
                        '<span class="marker-country' + title_position_class + '">' + data.country + '</span>'
                }),
          title: data.country,
        }).addTo(map);
        if (popup) {
          marker.bindPopup(popup);

          // Open headquarter popup for mobile.
          if ((window_width <= mobile_width) && data.headquarter) {
            marker.openPopup();
            this.setZoom(2).panTo(data.x, data.y);
          }
        }
      },
    },
    /*
    *  Add notes from a javascript array
    */
    import: function(notes) {
      if (this.ready) {
        var self = this;
        $.each(notes, function() {
          self.options.addNote.call(self, this);
        }); 
      }
    }
  });

  $(document).ready( function() {
    var $img = $(".map-block #map-block-img").imgNotes2( {
      onReady: function() {
        // Disable scrollWheelZoom
        this.map.scrollWheelZoom.disable();
        // Import notes
        var notes = drupalSettings.map_block.locations;
        this.import(notes);
        // Add desc...
        var myIcon = L.divIcon({
          className: 'desc-wrap',
          html: '<img src="/themes/custom/tederic/images/map/red-dot.svg"/>'+
                '<span>' + Drupal.t('Headquartes') + '</span>'+
                '<img src="/themes/custom/tederic/images/map/blue-dot.svg"/>'+
                '<span>' + Drupal.t('Subsidiaries') + '</span>'
        });
        // you can set .my-div-icon styles in CSS
        L.marker(this.relposToLatLng(0.5, 0.9), {icon: myIcon}).addTo(this.map);
      }
    });
  });

})(jQuery, Drupal, drupalSettings);
