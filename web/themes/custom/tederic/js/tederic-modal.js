(function ($, Drupal) {
  $(window).on('dialog:beforecreate', function (e, dialog, $element, settings) {
    $('body').addClass('modal-dialog-open');
    if (settings.dialogClass != '') {
      $('body').addClass('modal-dialog-' + settings.dialogClass);
    }
  });
  $(window).on('dialog:beforeclose', function (e, dialog, $element, settings) {
    $('body').removeClass('modal-dialog-open');
    $('body').removeClass(function (index, css) {
      return (css.match (/(^|\s)modal-dialog-\S+/g) || []).join(' ');
    });
  });

  // Close dialog by overlay click.
  function overlayClick(params) {
    $('.ui-widget-overlay').click(function() {
      $('button.ui-dialog-titlebar-close').trigger('click');
    });
  }
  $(document).ajaxComplete(function() {
    overlayClick();
  });

  // Fixed contact modal.
  $('#contact-modal').dialog({
    autoOpen: false,
    modal: true,
    draggable: false,
    open: function( event, ui ) {
      $('body').addClass('modal-dialog-open');
      overlayClick();
    },
    close: function( event, ui ) {
      $('body').removeClass('modal-dialog-open');
    },
  });
  $('.contact-modal-opener').on('click', function() {
    $('#contact-modal').dialog('open');
  });

})(jQuery, Drupal);
