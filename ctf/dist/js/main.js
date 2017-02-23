jQuery(function () {
    window.sr = ScrollReveal();

    jQuery('body').scrollspy({ target: '.nav-nav' });

    jQuery('a.page-scroll').bind('click', function (event) {
        var $anchor = jQuery(this);
        jQuery('html, body').stop().animate({
            scrollTop: jQuery($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });

    jQuery('.nav-share').on('click', function (event) {
        event.preventDefault();

        jQuery(this).toggleClass('active');
        jQuery('ul', this).toggleClass('active');
    });

    // sr.reveal('#gallery .item', { duration: 3000 }, 50);

    jQuery('#submit').on('click', function () {
        if (Captcha.CheckCaptcha()) {
            alert('功能未開放!');
        }
    });

    jQuery('#CaptchaImageCode').on('click', Captcha.CreateCaptcha);

    var qsRegex;
    var $grid = $('.grid').isotope({
        itemSelector: '.grid-item',
        filter: function () {
            return qsRegex ? $(this).text().match(qsRegex) : true;
        }
    });

    $(window).on('load', function () {
        $grid.isotope('layout');
    });

    // $grid.isotope({ filter: '.design' });

    jQuery('#gallery .filters button').on('click', function () {
        var $button = jQuery(this);
        var filter = $button.data('filter');

        if (filter === 'ALL') {
            $grid.isotope({ filter: '' });
        } else if (filter === 'WEBSITE') {
            $grid.isotope({ filter: '.website' });
        } else if (filter === 'MOBILE') {
            $grid.isotope({ filter: '.mobile' });
        } else if (filter === 'DESIGN') {
            $grid.isotope({ filter: '.design' });
        }

        jQuery('#gallery .filters button').toggleClass('active', false);
        $button.toggleClass('active', true);
    })

    var height = jQuery(window).height();

    jQuery('#banner').css({ height: height });

    if (height < 1024) {
        jQuery('#banner').css({ height: height });
    }

    jQuery('.mMenu').on('click', function () {
        jQuery('#nav .nav-nav').toggleClass('show');
    });

    jQuery('#main').on('click', function () {
        jQuery('#nav .nav-nav').toggleClass('show', false);
        jQuery('#nav .nav-share').toggleClass('active', false);
        jQuery('#nav .nav-share ul').toggleClass('active', false);
    });
});
