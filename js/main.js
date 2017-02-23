/**
 * Created by Administrator on 2017/2/23 0023.
 */
require(["js/util/common.js","js/util/datecontrol.js","js/util/searchcontrol.js","js/util/sidebarcontrol.js"], function (common,datecontrol,searchcontrol,sidebarcontrol) {
    var dateController = document.getElementById('hciDateBtn'),
        searchController = document.getElementById('hciSearchBtn'),
        nav = document.getElementById('hciNav');

    var mainWidth = 1140;
    var sidebar = document.getElementById('hciSidebar');

    common.addEvent(dateController,'click',datecontrol.datecontrol);
    common.addEvent(searchController,'click',searchcontrol.searchcontrol);

    sidebarcontrol.init(sidebar,mainWidth);

    var heightList = [];
    var _caculateHeight = function () {
        var contentArea = document.querySelectorAll('.hci-module');
        for (var i = 0; i < contentArea.length; i++) {
            var item = contentArea[i];
            height = item.offsetTop;
            heightList.push(height)
        }
        console.log(heightList);
    };
    _caculateHeight();

    var menu = document.querySelectorAll(".hci-sidebar-item");

    for (var i = 0; i < menu.length; i++) {
        common.addEvent(menu[i], "click", function () {
            var index = common.index(this, menu);
            var height = heightList[index];
            document.documentElement.scrollTop = height;
            document.body.scrollTop = height;
            window.pageYOffset = height;
            console.log(document.body.scrollTop);
        })
    }

    window.onscroll = function () {
        if(common.getScrollTop()>60){
            sidebarcontrol.setfixed(sidebar, '110px');
            common.addClass(nav,'scroll');
        }else{
            sidebarcontrol.cancelfixed(sidebar, '171px');
            common.removeClass(nav,'scroll');
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