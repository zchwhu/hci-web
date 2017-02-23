/**
 * Created by Administrator on 2017/2/15.
 */
require(["js/util/common.js","js/util/datecontrol.js","js/util/searchcontrol.js","js/util/carousel.js"], function (common,datecontrol,searchcontrol,carousel) {
    var dateController = document.getElementById('hciDateBtn'),
        searchController = document.getElementById('hciSearchBtn'),
        nav = document.getElementById('hciNav');

    var hciCarouselContainer = document.getElementById('hciCarousel'),
        hciCarouselInner = document.getElementById('hciCarouselInner');

    var hciCarousel = carousel();

    hciCarousel.init(hciCarouselContainer,hciCarouselInner);

    common.addEvent(dateController,'click',datecontrol.datecontrol);
    common.addEvent(searchController,'click',searchcontrol.searchcontrol);
    window.onscroll = function () {
        if(common.getScrollTop()>0){
            common.addClass(nav,'scroll');
        }else{
            common.removeClass(nav,'scroll');
        }
    }
})