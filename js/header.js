/**
 * Created by Administrator on 2017/3/10 0010.
 */
require(["js/util/common.js","js/util/datecontrol.js","js/util/searchcontrol.js"],function (common,datecontrol,searchcontrol) {
    var dateController = document.getElementById('hciDateBtn'),
        searchController = document.getElementById('hciSearchBtn'),
        nav = document.getElementById('hciNav');

    common.addEvent(dateController,'click',datecontrol.datecontrol);
    common.addEvent(searchController,'click',searchcontrol.searchcontrol);

    window.onscroll = function () {
        if(common.getScrollTop()>367){
            common.addClass(nav,'scroll');
        }else{
            common.removeClass(nav,'scroll');
        }
    };
})