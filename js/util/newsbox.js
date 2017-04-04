/**
 * Created by Administrator on 2017/4/4.
 */
'use strict';

define(['./common.js'], function (common) {
    function Newsbox(container,list) {
        this.container = container;
        this.list = list;
        this.titles = [];
        this.links = [];
        this.srcs = [];
        this.titleContainer = '';
        this.init();
    }

    Newsbox.prototype.init = function () {
        var titles = document.querySelectorAll('.hci-news-title');
        var imgs = document.querySelectorAll('.hci-news-img');
        for(var i=0;i<imgs.length;i++){
            this.srcs.push(imgs[i].src);
            this.titles.push(titles[i].innerText);
            this.links.push(titles[i].getAttribute('href'));
        }
        this.titleContainer = document.querySelector('.hci-news-jumbotron-title');
        this.bindEvent();
    }

    Newsbox.prototype.bindEvent = function () {
        var that = this;
        for(var i=0;i<this.list.length;i++){
            common.addEvent(this.list[i],'click',function () {
                var index = common.index(this,that.list);
                for(var j=0;j<that.list.length;j++){
                    if(index===j){
                        common.addClass(this,'active');
                    }else{
                        common.removeClass(that.list[j],'active');
                    }
                }
                that.change(that.srcs[index],that.titles[index],that.links[index]);
            })
        }
    }

    Newsbox.prototype.change = function (src,title,link) {
        var container = this.container;
        var target = this.container.parentNode;
        var titleContainer = this.titleContainer;
        common.removeClass(titleContainer,'pop');
        common.addClass(this.container.parentNode,'changing');
        this.container.style.backgroundImage = "url("+src+")";
        setTimeout(function () {
            common.removeClass(target,'changing');
            container.setAttribute('href',link);
            titleContainer.innerText = title;
            common.addClass(titleContainer,'pop');
        },600);
    }

    return function (container,list) {
        return new Newsbox(container,list);
    }
})