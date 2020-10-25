(function($, Drupal) {
  Drupal.behaviors.load_page = {
    attach: function (context, settings) {
      $(document).ready(function() {
        $('.load-page').addClass('hide-load-page');
      });
    }
  }
})(jQuery, Drupal);
