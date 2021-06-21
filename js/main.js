'use strict';
/*!
 * js scripts for GameR main page
 *
 Jakub Kwarciński - http://jakubkwarcinski.pl/
 *
 * this file has to be included only for main page of GameR template
 * you can edit this file for specific goals
 */
(function() {

    var $window = $(window);
    var $document = $(document);

    $window.on('load', function() {

        //scrolling to the specific hash code start
        var offsetTop = 121;
        var navbarBorder = 10;
        var hash = window.location.hash;
        if (hash) {
            if ($(hash).length > 0) {
                $('html, body').animate({
                    scrollTop: $(hash).offset().top - offsetTop + navbarBorder
                }, 500);
            }
        }
        //scrolling to the specific hash code end

        //skorllr plugin initialize - only for no-touch devices - code start
        if (($('body').data('skrollr')) && (!Modernizr.touchevents) && (Modernizr.csstransitions)) {
            var skrollrObj = skrollr.init({
                forceHeight: false,
                edgeStrategy: 'set',
                easing: {
                    WTF: Math.random,
                    inverted: function(p) {
                        return 1-p;
                    }
                }
            });
        }
        $('.panel-collapse').on('hidden.bs.collapse shown.bs.collapse', function () {
            skrollr.get().refresh();
        });
        $window.on('resize', function() {
            skrollr.get().refresh();
        });
        //skorllr plugin initialize - only for no-touch devices - code end

    });

    $document.ready(function(){

        //background parallax code start
        if (!Modernizr.touchevents) {
            $('#home').parallax("0%", 0.2, true);
            $('#buy').parallax("0%", 0.2, true);
            $('#flow').parallax("0%", 0.2, true);
            $('#testimonials').parallax("0%", 0.2, true);
            $('#comingsoon').parallax("0%", 0.2, true);
            $('#partners').parallax("0%", 0.2, true);
            $('#send-us-message').parallax("0%", 0.2, true);
        }
        //background parallax code end

        //refresh scrollspy on resize code start
        $window.on('resize', function() {
            $('[data-spy="scroll"]').each(function () {
                var $spy = $(this).scrollspy('refresh')
            });
        });
        //refresh scrollspy on resize code end


        /* Navigation - code start */

        var navbarBorder = 10;
        var offsetTop = 121;
        var homeHeight = $('#home').outerHeight() - offsetTop;

        //main menu navigation code start
        $('#main-menu a').not('.dropdown-toggle, .single-page').on('click', function(e) {
            e.preventDefault();
            var target = $(this).attr('href');
            $('html, body').stop(true, true).animate({
                scrollTop: $(target).offset().top - offsetTop + navbarBorder
            }, 500);
        });
        //main menu navigation code end

        //resize navbar code start
        function resizeNavbar() {
            if($window.scrollTop() >= homeHeight){
                $(".navbar-inverse").addClass("basic");
            } else {
                $(".navbar-inverse").removeClass("basic");
            }
        }
        resizeNavbar();
        $window.on('scroll', function(){
            resizeNavbar();
        });
        //resize navbar code end

        /* Navigation - code end */


        /* morris charts code start */

        //helper function to convert rgb to hex code start
        function rgb2hex(rgb) {
            rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
            function hex(x) {
                return ("0" + parseInt(x).toString(16)).slice(-2);
            }
            return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
        }
        //helper function to convert rgb to hex code end

        //helper function to make color lighter or darker code start
        function lightenDarkenColor(color, percent) {
            var num = parseInt(color.slice(1),16), amt = Math.round(2.55 * percent), R = (num >> 16) + amt, G = (num >> 8 & 0x00FF) + amt, B = (num & 0x0000FF) + amt;
            return "#" + (0x1000000 + (R<255?R<1?0:R:255)*0x10000 + (G<255?G<1?0:G:255)*0x100 + (B<255?B<1?0:B:255)).toString(16).slice(1);
        }
        //helper function to make color lighter or darker code start

        //order chart code start
        var $orderChart = $("#order-chart");
        var orderChart = Morris.Donut({
            element: $orderChart.attr("id"),
            backgroundColor: $orderChart.data("chartColorBackground"),
            colors: [$orderChart.data("chartColorFirst"), $orderChart.data("chartColorSecond"), $orderChart.data("chartColorThird")],
            labelColor: '#fff',
            resize: true,
            data: [
                {label: "Download Sales", value: 1245},
                {label: "In-Store Sales", value: 3045},
                {label: "Mail-Order Sales", value: 2034}
            ]
        });
        //order chart code end

        //fun chart code start
        var $funChart = $("#fun-chart");
        var funChart = Morris.Donut({
            element: $funChart.attr("id"),
            backgroundColor: $funChart.data("chartColorBackground"),
            colors: [$funChart.data("chartColorFirst"), $funChart.data("chartColorSecond"), $funChart.data("chartColorThird")],
            labelColor: '#fff',
            resize: true,
            data: [
                {label: "RPG", value: 23},
                {label: "Action", value: 23},
                {label: "Adventure", value: 54}
            ],
            formatter: function (y) { return y + "%" }
        });
        //fun chart code end

        //device chart code start
        var $deviceChart = $("#device-chart");
        var deviceChart = Morris.Donut({
            element: $deviceChart.attr("id"),
            backgroundColor: $deviceChart.data("chartColorBackground"),
            colors: [$deviceChart.data("chartColorFirst"), $deviceChart.data("chartColorSecond"), $deviceChart.data("chartColorThird")],
            labelColor: '#fff',
            resize: true,
            data: [
                {label: "PC", value: 44},
                {label: "Android", value: 6},
                {label: "Xbox", value: 15},
                {label: "PS3", value: 25}
            ],
          formatter: function (y) { return y + "%" }
        });
        //device chart code end

        //gpu bar code start
        var $gpuBar = $("#gpu-bar");
        var gpuBar = Morris.Bar({
            element: 'gpu-bar',
            barColors : [$gpuBar.data("chartColor")],
            gridTextColor: '#fff',
            resize: true,
            data: [
                {GPU: '2 x GTX 980 4GB SLI', fps: 42},
                {GPU: 'GTX Titan X 12GB', fps: 36},
                {GPU: 'GTX 980 4GB', fps: 26},
                {GPU: 'AMD R9 280x 4GB', fps: 20},
                {GPU: 'AMD R9 290x 4GB', fps: 24}
            ],
            xkey: 'GPU',
            ykeys: ['fps'],
            labels: ['FPS'],
            barRatio: 0.4,
            xLabelAngle: 0,
            hideHover: 'auto'
        });
        //gpu bar code end

        //redraw charts on colorChange code start
        $window.on('colorChange', function(e, color) {
            var newColor = rgb2hex(color);
            orderChart.options.colors = [newColor, lightenDarkenColor(newColor, -15), lightenDarkenColor(newColor, -30)];
            funChart.options.colors = [newColor, lightenDarkenColor(newColor, -15), lightenDarkenColor(newColor, -30)];
            deviceChart.options.colors = [newColor, lightenDarkenColor(newColor, -15), lightenDarkenColor(newColor, -30)];
            gpuBar.options.barColors = [newColor];
            orderChart.redraw();
            funChart.redraw();
            deviceChart.redraw();
            gpuBar.redraw();
        });
        //redraw charts on colorChange code end

        /* morris charts code end */


        //counter code start
        var someDate = new Date();
        var dd = ("0" + (someDate.getDate() + 3) ).slice(-2);
        var mm = ("0" + (someDate.getMonth() + 1) ).slice(-2);
        var y = someDate.getFullYear();
        var countdownDate = y + '/' + mm + '/' + dd;
        $('#clock').countdown({
            date: countdownDate
        });
        //counter code end

    })

    //google maps code start
    var markerImage = 'img/marker.png';
    function initialize() {
        var map_canvas = document.getElementById('map');
        var map_options = {
            center: new google.maps.LatLng(50.0559661,19.9308796),
            zoom: 17,
            scrollwheel: false,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            disableDefaultUI: true,
            styles: [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#000000"},{"lightness":40}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#000000"},{"lightness":16}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":17},{"weight":1.2}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":21}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":16}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":19}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":17}]}]
        }
        var map = new google.maps.Map(map_canvas, map_options)
        var myLatlng = new google.maps.LatLng(50.0559661,19.9308796);
        var marker = new google.maps.Marker({
            position: myLatlng,
            map: map,
            title:"Gamer office",
            icon: markerImage
        });
        marker.setMap(map);
    }
    window.initMap = initialize;
    //google maps code end

})();