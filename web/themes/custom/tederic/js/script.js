(function($, Drupal) {
  $(document).ready(function() {

    // Main slider
    var $status = $('.slick-pagination .numbers');

    function slickCount(slickElement) {
      slickElement.on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
        //currentSlide is undefined on init -- set it to 0 in this case (currentSlide is 0 based)
        var i = (currentSlide ? currentSlide : 0) + 1;
        $status.text(i + '/' + slick.slideCount);
      });
    }

    if ($('.slider-section .field-sliders').length > 0) {
      var $slickElement = $('.slider-section .field-sliders');
      slickCount($slickElement);

      $slickElement.not('.slick-initialized').slick({
        arrows: true,
        infinite: false,
        slidesToShow: 1,
        adaptiveHeight: true,
        autoplay: true,
        pauseOnHover: true,
        autoplaySpeed: 5000,
        appendArrows: $('.main-slick-arrows'),
        prevArrow: '<div class="main-arrow-prev" aria-hidden="true"></div>',
        nextArrow: '<div class="main-arrow-next" aria-hidden="true"></div>',
      });
    } else if ($('.solutions-part .field-images').length > 0) {
      var $slickElement = $('.solutions-part .field-images');
      slickCount($slickElement);

      $slickElement.not('.slick-initialized').slick({
        arrows: true,
        infinite: false,
        slidesToShow: 2,
        adaptiveHeight: true,
        autoplay: true,
        pauseOnHover: true,
        // centerMode: true,
        autoplaySpeed: 5000,
        appendArrows: $('.slick-pagination'),
        prevArrow: '<div class="main-arrow-prev" aria-hidden="true"></div>',
        nextArrow: '<div class="main-arrow-next" aria-hidden="true"></div>',
      });
    }

    // Slider for icons (Home page)
    $('.icons-section .field-icons-sliders').not('.slick-initialized').slick({
      arrows: true,
      infinite: false,
      slidesToShow: 3,
      slidesToScroll: 1,
      adaptiveHeight: true,
    });

    // Slider for icons (Home page)
    $('.vertical-carousel-text-section .field-images').not('.slick-initialized').slick({
      arrows: false,
      infinite: false,
      slidesToShow: 2,
        centerMode: true,
      slidesToScroll: 1,
      vertical: true,
      // verticalSwiping: true,
    });

  });
  Drupal.behaviors.script = {
    attach: function (context, settings) {

      // Show / Hide Language
      $('.language-toggle').unbind('click').bind('click', function() {
        $(this).toggleClass('l-active');
        $(this).next().toggleClass('l-show');
      });

      // Show / Hide Search
      $('.show-search').unbind('click').bind('click', function() {
        $('#block-tederic-search').addClass('open-search');
      });
      $('.close-search').unbind('click').bind('click', function() {
        $('#block-tederic-search').removeClass('open-search');
      });

    }
  }
})(jQuery, Drupal);
