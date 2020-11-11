(function($, Drupal) {
  $(document).ready(function() {

    if ($('.big-card').length > 0) {
      $('.big-card').each(function() {
        $(this).parent().addClass('big-card-li');
      });
    }

    // Close dialog by overlay click.
    $(document).ajaxComplete(function() {
      $('.ui-widget-overlay').click(function() {
        $('button.ui-dialog-titlebar-close').trigger('click');
      });
    });

    // vars
    var window_width = $(window).width();
    $(window).resize(function() {
      window_width = $(window).width();
    });

    // Mobile menu
    $('#block-tederic-main-menu > ul > li > ul').each(function() {
      // $(this).prev('a').addClass('dropdown');
      $(this).prev('a').attr('href', 'javascript:void(0);');
    });

    function mibileMenu() {
      if (window_width <= 767) {
        $('#block-top-menu').insertAfter('#block-tederic-main-menu > ul');
      } else {
        $('#block-top-menu').insertBefore('#block-languageswitcher');
      }
    }

    mibileMenu();
    $(window).resize(function() {
      mibileMenu();
    });

    // Button Up
    var document_height = $(document).height();
      if (document_height > 3500) {
      $(window).scroll(function() {
        if($(this).scrollTop() > 700) {
          $('.button-up').addClass('show-btn');
        } else {
          $('.button-up').removeClass('show-btn');
        }
      });
      $('.button-up').click(function() {
        $('body,html').animate({scrollTop:0},700);
      });
    }

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
    }
    if ($('.solutions-part .field-images').length > 0) {
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
    if ($('.image-carousel-section .field-images').length > 0) {
      var $slickElement = $('.image-carousel-section .field-images');
      slickCount($slickElement);

      $slickElement.not('.slick-initialized').slick({
        arrows: true,
        infinite: false,
        slidesToShow: 2,
        autoplay: true,
        pauseOnHover: true,
        // centerMode: true,
        autoplaySpeed: 5000,
        appendArrows: $('.slick-pagination'),
        prevArrow: '<div class="main-arrow-prev" aria-hidden="true"></div>',
        nextArrow: '<div class="main-arrow-next" aria-hidden="true"></div>',
        responsive: [
          {
            breakpoint: 767,
            settings: {
              slidesToShow: 1,
            }
          },
        ]
      });
    }
    if ($('.technology-node .field-images').length > 0) {
      var $slickElement = $('.technology-node .field-images');
      slickCount($slickElement);

      $slickElement.not('.slick-initialized').slick({
        arrows: true,
        infinite: false,
        slidesToShow: 1,
        appendArrows: $('.slick-pagination'),
        prevArrow: '<div class="main-arrow-prev" aria-hidden="true"></div>',
        nextArrow: '<div class="main-arrow-next" aria-hidden="true"></div>',
      });
    }

    const settings_sl_icons = {
      arrows: true,
      infinite: false,
      slidesToShow: 3,
      slidesToScroll: 3,
      adaptiveHeight: true,
    };

    const settings_products_selector = {
      arrows: false,
      infinite: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      adaptiveHeight: true,
    };

    var sl_icons_selector =  $('.icons-section .field-icons-sliders');
    var sl_products_selector =  $('.related-section .field-products');
    var sl_technologies_selector =  $('.related-section .field-technologies');
    var sl_products_solutions_selector =  $('.related-section .field-solutions');

    // Function initialized slick
    function initializedSlick(selector, settings) {
      if ((selector.length > 0) && (!selector.hasClass('slick-initialized'))) {
        selector.not('.slick-initialized').slick(settings);
      }
    }

    // Function unslick slick
    function unslick(selector) {
      if ((selector.length > 0) && (selector.hasClass('slick-initialized'))) {
        selector.slick('unslick');
      }
    }

    // Slick
    if (window_width <= 767) {
      // Slider destroy for icons (Home page)
      unslick(sl_icons_selector);

      // Solutions products
      initializedSlick(sl_products_selector, settings_products_selector);

      // Solutions technologies
      initializedSlick(sl_technologies_selector, settings_products_selector);

      // Products Solutions
      initializedSlick(sl_products_solutions_selector, settings_products_selector);
    } else {
      // Slider for icons (Home page)
      initializedSlick(sl_icons_selector, settings_sl_icons);

      // Solutions products
      unslick(sl_products_selector);

      // Solutions technologies
      unslick(sl_technologies_selector);

      // Products Solutions
      unslick(sl_products_solutions_selector);
    }

    // Slider for mobile
    $(window).on('resize', function() {
      if (window_width <= 767) {
        // Slider for icons (Home page)
        unslick(sl_icons_selector);

        // Solutions products
        initializedSlick(sl_products_selector, settings_products_selector);

        // Solutions technologies
        initializedSlick(sl_technologies_selector, settings_products_selector);

        // Products Solutions
        initializedSlick(sl_products_solutions_selector, settings_products_selector);
      } else {
        // Slider destroy for icons (Home page)
        initializedSlick(sl_icons_selector, settings_sl_icons);

        // Solutions products
        unslick(sl_products_selector);

        // Solutions technologies
        unslick(sl_technologies_selector);

        // Products Solutions
        unslick(sl_products_solutions_selector);
      }
    });

    // Vertical Slider
    $('.vertical-carousel-text-section .field-images').not('.slick-initialized').slick({
      arrows: false,
      infinite: false,
      slidesToShow: 1,
      centerMode: true,
      slidesToScroll: 1,
      // adaptiveHeight: true,
      vertical: true,
      // verticalSwiping: true,
    });
    if ($('.vertical-carousel-text-section .field-images').length > 0) {
      var maxHeight = -1;
      $('.slick-slide').each(function() {
        if ($(this).height() > maxHeight) {
          maxHeight = $(this).height();
        }
      });
      $('.slick-slide').each(function() {
        if ($(this).height() < maxHeight) {
          $(this).css('margin', Math.ceil((maxHeight-$(this).height())/2) + 'px 0');
        }
      });
    }

    // Show QR code
    $('.wechat .field-icon').click(function() {
      $('.field-qr-code').slideToggle();
    });

  });
  Drupal.behaviors.script = {
    attach: function (context, settings) {

      // Show filters
      $('.show-more-filters').unbind('click').bind('click', function() {
        $(this).toggleClass('active');
        $('.show-more-filters + .fieldgroup').slideToggle();
        $(this).closest('.views-exposed-form').toggleClass('open');
      });

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

      // Mobile menu
      $('.mobile-menu').unbind('click').bind('click', function() {
        $(this).toggleClass('active');
        $('#block-tederic-main-menu').slideToggle();
      });
      $('#block-tederic-main-menu .dropdown').unbind('click').bind('click', function() {
        $(this).next('ul').slideToggle();
        $(this).toggleClass('active');
      });

    }
  }
})(jQuery, Drupal);
