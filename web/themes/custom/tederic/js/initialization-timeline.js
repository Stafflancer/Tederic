(function($, Drupal) {
  Drupal.behaviors.timeline = {
    attach: function (context, settings) {

      // vars
      var window_width = $(window).width();

      // Function Timeline
      function useTimeline(number_items) {
        $('.timeline').timeline({
          mode:'horizontal',
          forceVerticalMode: 300,
          visibleItems: number_items
        });
      }

      if (window_width >= 1350) {
        useTimeline(8);
      } else if ((window_width >= 992) && (window_width <= 1350)) {
        useTimeline(4);
      } else {
        useTimeline(2);
      }

      $(window).resize(function() {
        window_width = $(window).width();

        if (window_width >= 1350) {
          useTimeline(8);
        } else if ((window_width >= 992) && (window_width <= 1350)) {
          useTimeline(4);
        } else {
          useTimeline(2);
        }
      });

    }
  }
})(jQuery, Drupal);
