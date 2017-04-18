/**
 * Created by Administrator on 2017/4/18.
 */
'use strict';

define(['./common.js'], function (common) {
    function preview(headImgs,hciPreview,hciPreviewWrapper){
        for(var i=0;i<headImgs.length;i++){
            common.addEvent(headImgs[i],'click',function () {
                var imgSrc = this.src;
                hciPreview.src = imgSrc;
                common.addClass(document.body,'inpreview');
            })
        }
        common.addEvent(hciPreviewWrapper,'click',function () {
            common.removeClass(document.body,'inpreview');
        })
    }

    return preview;
})