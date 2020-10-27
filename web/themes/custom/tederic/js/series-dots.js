(function($, Drupal) {
  "use strict";

  console.log('Used script: series-dots.js');

  Drupal.behaviors.series_dots = {
    attach: function (context, settings) {

      function seriesDots() {
        // Selectors for dots.
        var selectors = '[id^="edit-series-sub-category"] .form-item label, .products-with-filters .item-list h3';
        // Add a point.
        $(selectors, context).once(selectors).each(function (index) {
          // Get tag text.
          var temp = $(this).text();
          // If text has space, replace it with dot.
          if (temp.includes(" ")) {
            temp = temp.replace(" ", "<span>•</span>");
          }
          // If text has no space and text's tag is not <label>, add dot at the end.
          else if ($(this).prop("tagName") != 'LABEL') {
            temp = temp + "<span>.</span>";
          }
          // Replace with formatted text.
          $(this).html(temp);
        });
      }

      $(document).ready(function() {
        seriesDots();
      });
      $( document ).ajaxComplete(function() {
        seriesDots();
      });
    }
  }
})(jQuery, Drupal);
