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

      // Implement Hummer.js
      var timeline_el = $('.timeline .timeline__wrap');
      timeline_el.hammer().on("swipeleft", function(ev) {
        $('.timeline-nav-button--next').trigger('click');
      });
      timeline_el.hammer().on("swiperight", function(ev) {
        $('.timeline-nav-button--prev').trigger('click');
      });

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
