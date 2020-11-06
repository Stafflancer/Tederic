(function($, Drupal) {
  Drupal.behaviors.tederic_tabs = {
    attach: function (context, settings) {
      // Using once() with more complexity.
      $('.tederic-tabs', context).once('tederic-tabs').tabs({
        collapsible: false
      });
    }
  };
})(jQuery, Drupal);
