/**
 * Created by Administrator on 2017/2/15.
 */
require(["js/util/common.js","js/util/datecontrol.js","js/util/searchcontrol.js","js/util/newsbox.js"], function (common,datecontrol,searchcontrol,newsbox) {
    var dateController = document.getElementById('hciDateBtn'),
        searchController = document.getElementById('hciSearchBtn'),
        nav = document.getElementById('hciNav');

    var container = document.querySelector('.hci-news-jumbotron-inner');
    var list = document.querySelectorAll('.hci-news-item');

    var hciNewsBox = newsbox(container,list);

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