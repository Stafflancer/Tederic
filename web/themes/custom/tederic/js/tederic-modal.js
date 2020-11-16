(function ($, Drupal) {
  $(window).on('dialog:beforecreate', function (e, dialog, $element, settings) {
    $('body').addClass('modal-dialog-open');
    if (settings.dialogClass != '') {
      $('body').addClass('modal-dialog-' + settings.dialogClass);
    }
  });
  $(window).on('dialog:beforeclose', function (e, dialog, $element, settings) {
    console.log(settings);
    $('body').removeClass('modal-dialog-open');
    $('body').removeClass(function (index, css) {
      return (css.match (/(^|\s)modal-dialog-\S+/g) || []).join(' ');
    });
  });
})(jQuery, Drupal);
