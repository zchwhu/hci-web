/**
 * Created by Administrator on 2017/4/8 0008.
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

    window.onscroll = function () {
        if(common.getScrollTop()>80){
            sidebarcontrol.setfixed(sidebar, '110px');
            common.addClass(nav,'scroll');
        }else{
            sidebarcontrol.cancelfixed(sidebar, '171px');
            common.removeClass(nav,'scroll');
        }
    };
})