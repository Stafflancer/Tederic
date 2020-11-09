(function($, Drupal) {
  Drupal.behaviors.tederic_common_events = {
    attach: function (context, settings) {
      $('.prev-events-link').click(function() {
        // Remove load more button.
        $(this).remove();
        // Show view and change infinite scroll pager to automatic.
        // This needed because if automatic by default content loaded in hidden view.
        $('.prev-events-wrap').removeClass('hidden')
                              .find('.pager')
                              .attr('data-drupal-views-infinite-scroll-pager', 'automatic');
        // Reattach behaviors.
        Drupal.attachBehaviors();
      });
    }
  };
})(jQuery, Drupal);
