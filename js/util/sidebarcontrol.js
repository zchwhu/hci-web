/**
 * Created by Administrator on 2017/2/20.
 */
'use strict';

define(['js/util/common.js'], function (common) {
    var windowWidth = document.body.clientWidth;

    var init = function (ele, mainWidth) {
        ele.style.left = (windowWidth >= 1140 ? (windowWidth - mainWidth) / 2 : 0) + 'px';
        if(!common.hasClass(ele,'hci-sidebar-nav')){
            ele.style.opacity = 1;
        }
    }
    
    var render = function (ele,options) {
        var DEFAULT = [{
                name:"社会兼职"
            }, {
                name:"研究领域"
            },{
                name:"开设课程"
            },{
                name:"研究成果：专著"
            },{
                name:"研究成果：期刊论文"
            }];
        var data = options || DEFAULT;

        data.splice(0,0,{
            name:"返回顶部"
        });
        var navList = '',
            navItem = "<li class='hci-sidebar-nav-item'><a title='{#name#}'>{#name#}</a></li>";

        for(var i = 0;i<data.length;i++){
            navList += _formatString(navItem,data[i]);
        }
        ele.innerHTML = navList;

        /**
         * 格式化字符串，渲染模板
         * @param str
         * @param data
         * @returns {XML|string|void}
         * @private
         */
        function _formatString(str,data) {
            return str.replace(/\{#(\w+)#\}/g,function (match,key) {
                return typeof data[key] === undefined?'':data[key];
            });
        }
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
        render: render,
        setfixed: setfixed,
        cancelfixed: cancelfixed
    }
})