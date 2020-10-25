(function($, Drupal) {
    Drupal.behaviors.timeline = {
      attach: function (context, settings) {
        
        jQuery('.timeline').timeline({
          mode:'horizontal',
          visibleItems: 8
        });
          
      }
    }
  })(jQuery, Drupal);
  