/**
 * Created by Administrator on 2017/2/27 0027.
 */
require(["js/util/common.js","js/util/datecontrol.js","js/util/searchcontrol.js","js/util/sidebarcontrol.js","js/util/pagination.js"], function (common,datecontrol,searchcontrol,sidebarcontrol,pagination) {
    var dateController = document.getElementById('hciDateBtn'),
        searchController = document.getElementById('hciSearchBtn'),
        nav = document.getElementById('hciNav');

    var mainWidth = 1140;
    var sidebar = document.getElementById('hciSidebar');

    common.addEvent(dateController,'click',datecontrol.datecontrol);
    common.addEvent(searchController,'click',searchcontrol.searchcontrol);

    sidebarcontrol.init(sidebar,mainWidth);

    var prevBtn = document.getElementById('prev'),
        nextBtn = document.getElementById('next'),
        container = document.getElementById('hciPagination'),
        pages = document.querySelectorAll('.page'),
        hideBtn = document.getElementById('hide');

    var hciPagination = pagination();
    hciPagination.init(container,prevBtn,nextBtn,pages);

    common.addEvent(hideBtn,'click',function () {
        this.style.display = 'none'
        hciPagination.hide();
    })

    window.onscroll = function () {
        if(common.getScrollTop()>60){
            sidebarcontrol.setfixed(sidebar, '110px');
            common.addClass(nav,'scroll');
        }else{
            sidebarcontrol.cancelfixed(sidebar, '171px');
            common.removeClass(nav,'scroll');
        }
    };

})