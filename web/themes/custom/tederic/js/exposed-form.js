(function($, Drupal) {
  "use strict";

  console.log('Used script: exposed-form.js');

  Drupal.behaviors.exposed_form = {
    attach: function (context, settings) {

      function resetVisible() {
        var categories = $('[id^="edit-categories"] .form-checkboxes.bef-nested input:checked').length;
        var sub_categories = $('[id^="edit-series-sub-category"] .form-item input:checked').length;
        var sub_categories_all = $('[id^="edit-series-sub-category"] .form-item input[id^="edit-series-sub-category-all"]:checked').length;
        if (categories || (sub_categories && !sub_categories_all)) {
          $('[id^="edit-reset"]').show();
        }
        else {
          $('[id^="edit-reset"]').hide();
        }
      }

      $(document).ready(function() {
        resetVisible();
      });
      $( document ).ajaxComplete(function() {
        resetVisible();
      });
    }
  }
})(jQuery, Drupal);
  