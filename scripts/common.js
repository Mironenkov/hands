/**
 * Created by GloryManU on 04.07.2016.
 */
(function(){
    var slider = $('.reviewSlider').lightSlider({
        item: 2,
        pager: false,
        controls: false,
        responsive : [
            {
                breakpoint:1024,
                settings: {
                    item:2,
                    slideMove:1,
                    pager: true
                }
            },
            {
                breakpoint:480,
                settings: {
                    item:1,
                    enableTouch: false,
                    slideMove:1,
                    pager: true
                }
            }
        ]
    });
    $(".js-btn-prev").click(function(e){
        e.preventDefault();
        slider.goToPrevSlide();
    });
    $(".js-btn-next").click(function(e){
        e.preventDefault();
        slider.goToNextSlide();
    });

    var blog = $('.blogSlider').lightSlider({
        slideMargin: 20,
        item: 2,
        pager: false,
        controls: false,
        responsive : [
            {
                breakpoint:1024,
                settings: {
                    item:2,
                    slideMove:1,
                    pager: true
                }
            },
            {
                breakpoint:480,
                settings: {
                    item:1,
                    enableTouch: false,
                    slideMove:1,
                    pager: true
                }
            }
        ]
    });
    $("#btn-prev").click(function(e){
        e.preventDefault();
        blog.goToPrevSlide();
    });
    $("#btn-next").click(function(e){
        e.preventDefault();
        blog.goToNextSlide();
    });

    $jQuery = jQuery.noConflict();
    $jQuery(window).hashchange(function(){
        var link = window.location.hash.replace("#", "");
        get_page_by_hash(link);
    });

    function get_page_by_hash(link){
        if(typeof(link) != "undefined"){
            if(link !== ""){
                $jQuery.ajax({
                    type: "POST",
                    cache: false,
                    async: false,
                    url: link,
                    success: function(data){
                        if(data !== ""){
                            $jQuery("body").html(data);
                        }
                    }
                });
            }
        }
    }
    $jQuery("a").click(function(){
        if($jQuery(this).attr("href").substr(0, 1) == "/"){
            window.location.hash = $jQuery(this).attr("href");
        }
    });

    function getNameBrouser() {
        var userAgent = navigator.userAgent.toLowerCase();
        // Определим Internet Explorer
        if (userAgent.indexOf("msie") != -1 && userAgent.indexOf("opera") == -1 && userAgent.indexOf("webtv") == -1) {
            return "msie";
        }
        // Opera
        if (userAgent.indexOf("opera") != -1) {
            return "opera";
        }
        // Gecko = Mozilla + Firefox + Netscape
        if (userAgent.indexOf("gecko") != -1) {
            return "gecko";
        }
        // Safari, используется в MAC OS
        if (userAgent.indexOf("safari") != -1) {
            return "safari";
        }
        // Konqueror, используется в UNIX-системах
        if (userAgent.indexOf("konqueror") != -1) {
            return "konqueror";
        }
        return "unknown";
    }

    $jQuery("a").click(function(){
        if($jQuery(this).attr("href").substr(0, 1) == "/"){
            if(getNameBrouser() == "gecko"){
                window.history.pushState("", "", $jQuery(this).attr("href"));
                window.history.replaceState("", "", $jQuery(this).attr("href"));
                get_page_by_hash($jQuery(this).attr("href"));
            }else{
                window.location.hash = $jQuery(this).attr("href");
            }
            return false;
        }
    });
})();