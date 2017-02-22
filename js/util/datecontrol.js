/**
 * Created by Administrator on 2017/2/18.
 */
'use strict';

define(['./common.js','./slideToggle.js'], function (common,slide) {
    var datecontrol = function () {
        var body = document.body,
            hciDateBtn = document.getElementById('hciDateBtn'),
            hciDateList = document.getElementById('hciDateList');
        if (common.hasClass(hciDateBtn, "active")) {
            common.removeClass(body, 'fixed');
            common.removeClass(hciDateBtn, 'active');
            slide.slideToggle(hciDateList,true);

        } else {
            common.addClass(body, 'fixed');
            common.addClass(hciDateBtn, 'active');
            slide.slideToggle(hciDateList,false);
        }
    };
    return {
        datecontrol: datecontrol
    }
})