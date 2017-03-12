/**
 * Created by Administrator on 2017/3/12 0012.
 */
require(["js/util/common.js","js/util/datecontrol.js","js/util/searchcontrol.js","js/util/sidebarcontrol.js","js/util/pagination.js"], function (common,datecontrol,searchcontrol,sidebarcontrol,pagination) {
    var dateController = document.getElementById('hciDateBtn'),
        searchController = document.getElementById('hciSearchBtn'),
        nav = document.getElementById('hciNav');

    var mainWidth = 1140,
        options = [];
    var sidebar = document.getElementById('hciSidebar'),
        sidebarNav = document.getElementById('hciSidebarNav'),
        navList = document.querySelector('.hci-sidebar-nav-list'),
        navText = document.querySelectorAll('.hci-cont-title');

    for(var j = 0;j<navText.length;j++){
        var obj = {};
        obj.name = navText[j].innerText;
        options.push(obj);
    }

    common.addEvent(dateController,'click',datecontrol.datecontrol);
    common.addEvent(searchController,'click',searchcontrol.searchcontrol);

    sidebarcontrol.init(sidebar,mainWidth);
    sidebarcontrol.init(sidebarNav,mainWidth);
    sidebarcontrol.render(navList,options);

    var heightList = [];
    var _caculateHeight = function () {
        heightList.push(0);
        var contentArea = document.querySelectorAll('.hci-module');
        for (var i = 0; i < contentArea.length; i++) {
            var item = contentArea[i];
            height = item.offsetTop;
            heightList.push(height);
        }
    };
    _caculateHeight();

    var menu = document.querySelectorAll(".hci-sidebar-nav-item");

    for (var i = 0; i < menu.length; i++) {
        common.addEvent(menu[i], "click", function () {
            var index = common.index(this, menu);
            var height = heightList[index];
            document.documentElement.scrollTop = height;
            document.body.scrollTop = height;
            window.pageYOffset = height;
        })
    }

    window.onscroll = function () {
        if(common.getScrollTop()>223){
            common.addClass(nav,'scroll');
        }else{
            common.removeClass(nav,'scroll');
        }

        if(common.getScrollTop()>584){
            common.addClass(sidebarNav,'show');
        }else{
            common.removeClass(sidebarNav,'show');
        }

        for(var i=0;i<heightList.length;i++){
            var height1 = heightList[i];
            var height2 = heightList[i+1];
            if(!height2||common.getScrollTop()>=heightList[i]&&common.getScrollTop()<heightList[i+1]){
                for(var j=0;j<menu.length;j++){
                    if(i==j){
                        common.addClass(menu[j],'active');
                    }else{
                        common.removeClass(menu[j],'active');
                    }
                }
                return;
            }
        }
    };
})