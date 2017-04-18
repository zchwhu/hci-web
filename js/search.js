/**
 * Created by Administrator on 2017/4/18.
 */
'use strict';

require(["js/util/common.js","js/util/datecontrol.js","js/util/searchcontrol.js","js/util/pagination.js"], function (common,datecontrol,searchcontrol,pagination) {
    var dateController = document.getElementById('hciDateBtn'),
        searchController = document.getElementById('hciSearchBtn'),
        nav = document.getElementById('hciNav');

    var MAXSCROLLTOP = 91;
    common.addEvent(dateController,'click',datecontrol.datecontrol);
    common.addEvent(searchController,'click',searchcontrol.searchcontrol);

    var prevBtn = document.getElementById('prev'),
        nextBtn = document.getElementById('next'),
        container = document.getElementById('hciPagination'),
        pages = document.querySelectorAll('.page');

    var hciPagination = pagination();
    hciPagination.init(container,prevBtn,nextBtn,pages);

    window.onscroll = function () {
        if(common.getScrollTop()>MAXSCROLLTOP){
            common.addClass(nav,'scroll');
        }else{
            common.removeClass(nav,'scroll');
        }
    };

})