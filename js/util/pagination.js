/**
 * Created by Administrator on 2017/3/3 0003.
 */
'use strict';

define(['./common.js'],function (common){
    /**
     * 分页组件构造函数
     * @constructor
     */
    var Pagination = function () {
        this.ele = null;
        this.prevPage = null;
        this.nextPage = null;
        this.pages = null;
        this.pageIndex = 0;
    };

    /**
     * 初始化分页组件，绑定dom元素及事件
     * @param ele 分页组件元素
     * @param prevBtn 上一页按钮
     * @param nextBtn 下一页按钮
     * @param pages 页码列表
     */
    Pagination.prototype.init = function (ele,prevBtn,nextBtn,pages) {
        this.ele = ele;
        this.prevPage = prevBtn;
        this.nextPage = nextBtn;
        this.pages = pages;
        var that = this;
        common.addEvent(this.nextPage,"click",function () {
            if(that.pageIndex+1>=pages.length){
                return;
            }
            that.next();
        });
        common.addEvent(this.prevPage,"click",function () {
            if(that.pageIndex==0){
                return;
            }
            that.prev();
        });
        for(var i = 0;i<this.pages.length;i++){
            var items = this.pages;
            common.addEvent(this.pages[i],"click",function (event) {
                var index = common.index(this,items);
                that.pageIndex = index;
                that.select(index);
            })
        }
    };

    /**
     * 选择某一页
     * @param index 页码索引
     */
    Pagination.prototype.select = function (index) {
        for(var i = 0;i<this.pages.length;i++){
            if(i===index){
                common.addClass(this.pages[i],'active');
            }else{
                common.removeClass(this.pages[i],'active');
            }
        }
    };

    /**
     * 选择下一页
     */
    Pagination.prototype.next = function () {
        this.select(++this.pageIndex);
    };

    /**
     * 选择上一页
     */
    Pagination.prototype.prev = function () {
        this.select(--this.pageIndex);
    };

    Pagination.prototype.hide = function () {
        this.ele.style.display = 'none';
    };

    /**
     * 返回接口，用于调用分页组件构造函数
     */
    return function () {
        return new Pagination();
    }
})