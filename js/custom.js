'use strict';
/*!
 * js scripts for GameR all pages
 *
 Jakub Kwarciński - http://jakubkwarcinski.pl/
 *
 * this file has to be included in every page of the GameR template
 * you can edit this file for specific goals
 */
(function() {

  var $window = $(window);
  var $document = $(document);

    //preloader code start
    $window.on('load.preloader', function() {
        var preloader = $('.loader-overlay');
        preloader.fadeOut(1000, function () {
            preloader.remove();
        });
    });
    //preloader code end

    $document.ready(function() {

        var $sidebar = $('.sidebar');

        // sidebar-switcher
        $document.on('click.sidebar', '.sidebar-switcher', function (event) {
            event.preventDefault();
            $sidebar.toggleClass('open');
        });
        // sidebar-switcher end

        //color switch code start
        var $stylesheets = $('link[rel~=stylesheet][title]');
        var $stylesheet = $stylesheets.filter('[rel=stylesheet]');
        var $colorSwitchers = $(".color-switcher");
        if ($stylesheet.length) {
            var currentColor = $stylesheet.attr('title');
            $sidebar.find(".bg-"+currentColor).addClass("active");
            $document.on('click.color-switcher', '.color-switcher', function (event) {
                var $element = $(this);
                event.preventDefault();
                $colorSwitchers.removeClass('active');
                $element.addClass('active');
                var color = $element.css('background-color');
                $window.trigger("colorChange", [ color ]);
                var title = $element.data('color');
                $stylesheets.each(function () {
                    var el = $(this);
                    el.prop('disabled', el.attr('title') !== title);
                });
            });
            $stylesheets.each(function () {
                var el = $(this);
                el.prop('disabled', el.is('[rel~=alternate]'));
            });
        }
        //color switch code end

        //tooltip code start
        $('[data-toggle="tooltip"]').tooltip({
            'html': true
        });
        $document.on('click.tooltip-clickable', '[data-toggle="tooltip-clickable"]', function (e) {
            e.preventDefault();
        });
        $('[data-toggle="tooltip-clickable"]').tooltip({
            'trigger': 'click',
            'html': true
        });
        //tooltip code end

        //scrolling to the top code start
        var $toTop = $('#toTop');
        var $htmlBody = $('html, body');
        $toTop.on('click.toTop', function (event) {
            event.preventDefault();
            $htmlBody.animate({ scrollTop: 0 }, 500);
        });
        function appearScroller() {
            $toTop.toggleClass('active', $window.scrollTop() > 50);
        }
        $window.on('scroll.toTop', appearScroller);
        appearScroller();
        //scrolling to the top code end

    })

})();
