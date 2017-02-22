/**
 * Created by Administrator on 2017/2/15.
 */
'use strict';

define(function () {
    /**
     * 判断元素是否包含类名
     * @param ele dom元素
     * @param className 类名
     * @returns {boolean} 是否包含指定类名
     */
    var hasClass = function (ele, className) {
        var classNameList = ele.className;
        if (ele && ele.classList && ele.classList.contains) {
            return ele.classList.contains(className);
        } else {
            if (( ' ' + classNameList + ' ' ).indexOf(className) > -1) {
                return true;
            } else {
                return false;
            }
        }
    };

    var addClass = function (ele, className) {
        if (hasClass(ele, className)) {
            return;
        }
        if (ele && ele.classList && ele.classList.add) {
            ele.classList.add(className);
        } else {
            ele.className += ' ' + className;
        }
    };

    var removeClass = function (ele, className) {
        if (!hasClass(ele, className)) {
            return;
        }
        if (ele && ele.classList && ele.classList.remove) {
            ele.classList.remove(className);
        } else {
            ele.className = ele.className.replace(new RegExp("\\b" + className + "\\b"), "");
        }
    };
    /**
     * ele元素绑定事件
     * @param ele dom元素
     * @param type 事件类型
     * @param fn 事件方法
     */
    var addEvent = function (ele, type, fn) {
        if (ele.addEventListener) {
            ele.addEventListener(type, fn, false);
        } else if (ele.attachEvent) {
            ele.attachEvent('on' + type, fn);
        } else {
            ele['on' + type] = fn;
        }
    };

    var getScrollTop = function()
    {
        var scrollTop=0;
        if(document.documentElement&&document.documentElement.scrollTop)
        {
            scrollTop=document.documentElement.scrollTop;
        }
        else if(document.body)
        {
            scrollTop=document.body.scrollTop;
        }
        return scrollTop;
    };

    var index = function(self,obj){
        for(var i=0;i < obj.length;i++){
            if(obj[i]==self){
                return i;
            }
        }
    };

    return {
        hasClass: hasClass,
        addClass: addClass,
        removeClass: removeClass,
        addEvent: addEvent,
        getScrollTop: getScrollTop,
        index: index
    }
})