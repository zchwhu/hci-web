/**
 * Created by Administrator on 2017/2/20.
 */
require(['js/util/common.js', 'js/util/animation.js'], function (common, animation) {
    var mainWidth = 1140;
    var sidebar = document.getElementById('hciSidebar');
    var windowWidth = document.getElementById("hciNav").clientWidth;

    var _init = function (ele, mainWidth) {
        ele.style.left = (windowWidth >= 1140 ? (windowWidth - mainWidth) / 2 : 0) + 'px';
    }

    var _setfixed = function (ele, top) {
        ele.style.position = 'fixed';
        ele.style.top = top;
    }
    var _cancelfixed = function (ele, top) {
        ele.style.position = 'absolute';
        ele.style.top = top;
    }

    var heightList = [];
    var _caculateHeight = function () {
        var contentArea = document.querySelectorAll('.hci-content');
        for (var i = 0; i < contentArea.length; i++) {
            var item = contentArea[i];
            height = item.offsetTop;
            heightList.push(height)
        }
    };
    _caculateHeight();

    var timer;
    var menu = document.querySelectorAll(".hci-sidebar-item");
    var requestAnimationFrame = (function () {
        return window.requestAnimationFrame
            || window.webkitRequestAnimationFrame
            || window.mozRequestAnimationFrame
            || window.oRequestAnimationFrame
            || function (callback) {
                return window.setTimeout(callback, 1000/60);
            };
    })();

    var cancelAnimationFrame = (function () {
        return window.cancelAnimationFrame
            || window.webkitCancelAnimationFrame
            || window.mozCancelAnimationFrame
            || window.oCancelAnimationFrame
            || function (id) {
                return window.clearTimeout(id)
            };
    })();


    for (var i = 0; i < menu.length; i++) {
        common.addEvent(menu[i], "click", function () {
            var index = common.index(this, menu);
            var height = heightList[index];

            var step = function () {
                var top =  document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
                if(Math.abs(top-height)>10){
                    console.log("Ok");
                    if(top>height){
                        top-=20;
                    }else{
                        top+=20;
                    }
                    if((typeof document.documentElement.scrollTop)==='number'){
                        document.documentElement.scrollTop = top;
                    }else if(typeof window.pageYOffset==='number'){
                        window.pageYOffset =top;
                    }else{
                        document.body.scrollTop = top;
                    }
                    requestAnimationFrame(step);
                }else{
                    cancelAnimationFrame(step);
                }
            };
            if((typeof document.documentElement.scrollTop)==='number'){
                if(Math.abs(document.documentElement.scrollTop-height)>10){
                    step();
                }
            }else if(typeof window.pageYOffset==='number'){
                if(Math.abs(window.pageYOffset-height)>10){
                    step();
                }
            }else{
                if(Math.abs(document.body.scrollTop-height)>10){
                    step();
                }
            }

        })
    }

    _init(sidebar, mainWidth);

    window.onscroll = function () {
        common.getScrollTop() >= 60 ? _setfixed(sidebar, '110px') : _cancelfixed(sidebar, '171px');
    };

    // document.getElementById("scrollButton").onclick = function () {
    //     var nowScroll = document.body.scrollTop, flag = "up";
    //     var funScroll = function () {
    //         var top = document.body.scrollTop;
    //         if (flag == "up") {
    //             top -= 20;
    //             if (top <= 0) {
    //                 top = 0;
    //                 flag = "down";
    //             }
    //         }
    //         else if (flag == "down") {
    //             top += 20;
    //             if (top >= nowScroll) {
    //                 top = nowScroll;
    //                 flag = "stop";
    //             }
    //         }
    //         else {
    //             return;
    //         }
    //         document.body.scrollTop = top;
    //         requestAnimationFrame(funScroll);
    //     };
    //     if (nowScroll) {
    //         funScroll()
    //     }
    //     ;
    // };
})