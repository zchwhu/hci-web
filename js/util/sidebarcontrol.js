/**
 * Created by Administrator on 2017/2/20.
 */
'use strict';

define(['js/util/common.js'], function (common) {
    var windowWidth = document.body.clientWidth;

    var init = function (ele, mainWidth) {
        console.log(windowWidth);
        ele.style.left = (windowWidth >= 1140 ? (windowWidth - mainWidth) / 2 : 0) + 'px';
        ele.style.opacity = 1;
    }

    var setfixed = function (ele, top) {
        ele.style.position = 'fixed';
        ele.style.top = top;
    }
    var cancelfixed = function (ele, top) {
        ele.style.position = 'absolute';
        ele.style.top = top;
    }

    return{
        init: init,
        setfixed: setfixed,
        cancelfixed: cancelfixed
    }
})