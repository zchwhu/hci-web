/**
 * Created by Administrator on 2017/4/17.
 */
'use strict';

define(['./common.js'], function (common) {
    function Waterfall(container,items) {
        this.container = document.querySelector(container);
        this.items = document.querySelectorAll(items);
        this.COLS = 3;
        this.colsHeight = [];
        this.init();
    }
    
    Waterfall.prototype.init = function () {
        var len = this.items.length;
        for(var i=0;i<len;i++){
            if(i<this.COLS){
                this.colsHeight.push(this.items[i].offsetHeight);
            }else{
                var minHeight = Math.min.apply(null,this.colsHeight);
                var minIndex = this.getMinIndex(this.colsHeight,minHeight);
                this.items[i].style.position = 'absolute';
                this.items[i].style.top = minHeight+'px';
                this.items[i].style.left = minIndex*100/3+"%";
                this.colsHeight[minIndex]+=this.items[i].offsetHeight;
            }
        }
        this.container.style.height = Math.max.apply(null,this.colsHeight)+'px';
    }

    Waterfall.prototype.getMinIndex = function (arr,val) {
        var len = arr.length;
        for(var i=0;i<len;i++){
            if(arr[i]===val){
                return i;
            }
        }
    }
    
    return function (container,items) {
        return new Waterfall(container,items);
    }
})