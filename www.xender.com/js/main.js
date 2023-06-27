$(document).ready(function() {

    $(".main").onepage_scroll({
        sectionContainer: "section", // sectionContainer accepts any kind of selector in case you don't want to use section
        easing: "ease", // Easing options accepts the CSS3 easing animation such "ease", "linear", "ease-in", "ease-out", "ease-in-out", or even cubic bezier value such as "cubic-bezier(0.175, 0.885, 0.420, 1.310)"
        animationTime: 900, // AnimationTime let you define how long each section takes to animate
        pagination: true, // You can either show or hide the pagination. Toggle true for show, false for hide.
        updateURL: false // Toggle this true if you want the URL to be updated automatically when the user scroll to each page.
    });

});

function init() {

    // start up after 2sec no matter what
    //    window.setTimeout(function(){
    //        start();
    //    }, 2000);
    start();
    var url = window.location.href;
    if (url.indexOf("#5") != -1) {
        $(".onepage-pagination li a").get(4).click();
    }
}

// fade in experience
function start() {
    $('body').removeClass("loading").addClass('loaded');
}

function navEvent() {
    var ifr = document.getElementById("videoIframe");

    $(".back-link").off('click').on('click', 'span', function(e) {
        var cn = this.className;
        switch (cn) {
            case 'home':
                $(".onepage-pagination li a").get(0).click();
                break;
            case 'download':
                $(".onepage-pagination li a").get(4).click();
                break;
            case 'faq':
                window.location.href = "faq.html"
                break;
            case 'terms':
                window.location.href = "/terms"
                break;
            case 'about':
                window.location.href = "about.html"
                break;
            default:
                break;
        }
    });

    $("#logo_container").unbind('click').bind('click', function() {
        window.location.href = 'index.html';
    });

    // $("#getApp").unbind('click').bind('click', function(e){
    //        $(".onepage-pagination li a").get(4).click();
    // });

    $("#blockDesk").unbind('click').bind('click', function(e) {
        this.style.display = "none";
        $("#videoContainer").hide();
        ifr.src = "";
    });

    $("#watchVideo").unbind('click').bind('click', function(e) {
        var url = "https://www.youtube.com/embed/k5yj0K0oPrY"; // "//www.youtube.com/embed/wvORcUK6ujI";

        if (ifr.src.indexOf(url) < 0) {
            ifr.src = url
        }

        $("#blockDesk").show();
        $("#videoContainer").show();
    });
}

var getSize = function() {
    var windowWidth, windowHeight;
    if (self.innerHeight) { // all except Explorer
        if (document.documentElement.clientWidth) {
            windowWidth = document.documentElement.clientWidth;
        } else {
            windowWidth = self.innerWidth;
        }
        windowHeight = self.innerHeight;
    } else if (document.documentElement && document.documentElement.clientHeight) { // Explorer 6 Strict Mode
        windowWidth = document.documentElement.clientWidth;
        windowHeight = document.documentElement.clientHeight;
    } else if (document.body) { // other Explorers
        windowWidth = document.body.clientWidth;
        windowHeight = document.body.clientHeight;
    }

    return {
        "width": windowWidth,
        "height": windowHeight
    };
}



function multiScreen() {
    var xenderConfig = {
        menuFlag: false,
        bodyDom: document.body,
        mainDom: document.getElementById('main')
    };

    // resize page
    var minPer = 60;
    var maxPer = 100;
    var stepCount = 40;
    var minNumber = 480;
    var maxNumber = 1280;
    var per = 100;
    var firstPageBtn = document.getElementById('one_page_btns');

    var setResize = function() {
        var winW = getSize().width;
        var winH = getSize().height;
        var len = winW > minNumber ? winW : minNumber;
        var step = (maxNumber - minNumber) / stepCount;
        var fixPer = (len - minNumber) / step;

        if (winW / winH > 0.85) {
            if (winW > 700 && winW < 1024) {
                firstPageBtn.className = 'button_container middle'
            } else if (winW >= 1024) {
                firstPageBtn.className = 'button_container large'
            } else {
                firstPageBtn.className = 'button_container'
            }
        } else {
            firstPageBtn.className = 'button_container'
        }

        if (fixPer > stepCount) {
            per = maxPer;
        } else if (maxPer < 0) {
            per = minPer;
        } else {
            per = minPer + fixPer;
        }

        // console.log('per = ' + per);
        xenderConfig.mainDom.style.fontSize = per + "%";
    };
    setResize();

    $('#menu-list').off('click').on('click', function(e) {
        $('#menu-list').fadeOut(function(e) {
            xenderConfig.menuFlag = false;
            this.style.display = '';
            $(this).removeClass('show_dom');
            $(this).addClass('hide_dom');
            $('#menu_btn').fadeIn(function() {
                this.style.display = '';
                $(this).removeClass('hide_dom');
                $(this).addClass('show_dom');
            });
        });

    });
    $('#menu_btn').off('click').on('click', function(e) {
        e.stopPropagation();
        if (xenderConfig.menuFlag) {
            xenderConfig.menuFlag = false;

            $(this).removeClass('hide_dom');
            $(this).addClass('show_dom');
            $('#menu-list').fadeOut(function() {
                this.style.display = '';
                $(this).removeClass('show_dom');
                $(this).addClass('hide_dom');
            });
        } else {
            xenderConfig.menuFlag = true;

            $(this).removeClass('show_dom');
            $(this).addClass('hide_dom');
            $('#menu-list').fadeIn(function() {
                this.style.display = '';
                $(this).removeClass('hide_dom');
                $(this).addClass('show_dom');
            });
        }
    });

    $(window).unbind('resize').bind('resize', function(e) {
        setResize();
    });
};

$(window).load(function() {

    // fade in page
    init();
    navEvent();
    multiScreen();


});