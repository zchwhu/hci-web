/**
 * Created by Administrator on 2017/2/23 0023.
 */
define(['./common.js'],function (common) {
    var Carousel = function () {
        this.container = null;
        this.ele = null;
        this.width = null;
        this.currentIndex = 0;
        this.length = 0;
        this.prevBtn = null;
        this.nextBtn = null;
        this.offsetY = 0;
        this.supported = null;
        this.DURATION = 3000;
        this.paused =null;
        this.selections = null;
    };

    /**
     * 轮播图初始化
     * @param container
     * @param ele
     */
    Carousel.prototype.init = function (container,ele) {
        var that = this;
        // 轮播图指定外层容器及主体元素
        this.container = container;
        this.ele = ele;

        /**
         * 判断浏览器是否支持某一css3属性
         * @param style
         * @returns {boolean}
         * @private
         */
        function _supportCss3(style) {
            var prefix = ['webkit', 'Moz', 'ms', 'o'],
                i,
                humpString = [],
                htmlStyle = document.documentElement.style,
                _toHumb = function (string) {
                    return string.replace(/-(\w)/g, function ($0, $1) {
                        return $1.toUpperCase();
                    });
                };
            for (i in prefix)
                humpString.push(_toHumb(prefix[i] + '-' + style));
            humpString.push(_toHumb(style));
            for (i in humpString)
                if (humpString[i] in htmlStyle) return true;
            return false;
        }

        this.supported = _supportCss3('transform');
        // 获取轮播项目及设置长度
        var items = ele.children;
        this.length = items.length;

        // 设置轮播图尺寸
        //为了方便扩展轮播图数目，动态设置尺寸，未在css中固定尺寸
        this.width = container.clientWidth>1140?container.clientWidth:1140;
        for(var i = 0;i<items.length;i++){
            items[i].style.width = this.width+"px";
        }
        this.ele.style.width = this.width*items.length +"px";

        //上一张下一张按钮绑定
        this.prevBtn = document.getElementById('prev');
        this.nextBtn = document.getElementById('next');
        common.addEvent(that.prevBtn,'click',function () {
            that.prev(that);
        });
        common.addEvent(that.nextBtn,'click',function () {
            that.next(that);
        });

        //轮播图暂停和重启
        common.addEvent(this.container,'mouseover',function () {
            that.pause(that);
        });
        common.addEvent(this.container,'mouseout',function () {
            if(!that.paused){
                that.paused = that.play();
            }
        })


        this.selections = document.querySelectorAll('.indicator-item');
        for(var i=0;i<this.selections.length;i++){
            common.addEvent(this.selections[i],'click',function (event) {
                event = event ? event : window.event;
                var target = event.srcElement ? event.srcElement : event.target;
                that.select(target);
            })
        }
        //启动轮播图
        this.paused = this.play();
    };

    /**
     * 轮播图切换
     * @param direction 切换方向
     */
    Carousel.prototype.slide = function (direction) {
        var vendors = {
            "webkit": "-webkit-transform",
            "ms": "-ms-transform",
            "o": "-o-transform",
            "moz": "-moz-transform",
            "standard": "transform"
        };
        var cssText = '';
        if(direction === 'prev'){
            if(this.currentIndex===0){
                this.offsetY=-this.width*(this.length-1);
                this.currentIndex=this.length-1
                _move(this,this.offsetY,this.selections,this.currentIndex);
            }else{
                this.currentIndex--;
                this.offsetY+=this.width;
                _move(this,this.offsetY,this.selections,this.currentIndex);
            }
        }else{
            if(this.currentIndex===this.length-1){
                this.offsetY=0;
                this.currentIndex=0;
                _move(this,this.offsetY,this.selections,this.currentIndex);
            }else{
                this.currentIndex++;
                this.offsetY-=this.width;
                _move(this,this.offsetY,this.selections,this.currentIndex);
            }
        }

        /**
         * 轮播图运动
         * @param obj 轮播图对象
         * @param offset 偏移量
         * @param selections 指示点
         * @param index 索引值
         * @private
         */
        function _move(obj,offset,selections,index) {
            for(var j=0;j<selections.length;j++){
                if(common.index(selections[j],selections)===index){
                    common.addClass(selections[j],'active');
                }else{
                    common.removeClass(selections[j],'active');
                }
            }
            if(obj.supported){
                for(var key in vendors){
                    cssText+=vendors[key]+":translate("+(offset)+"px,0);";
                }
            }else{
                cssText+=";left:"+offset+"px;";
            }
            obj.ele.style.cssText +=cssText;
        }
    };

    /**
     * 切换轮播图上一张
     * @param obj 当前轮播图对象
     */
    Carousel.prototype.prev = function (obj) {
        obj.slide('prev');
    };

    /**
     * 切换轮播图下一张
     * @param obj 当前轮播图对象
     */
    Carousel.prototype.next = function (obj) {
        obj.slide('next');
    };

    /**
     * 根据指示点选择
     * @param target 点击的指示点对象
     */
    Carousel.prototype.select = function (target) {
        var vendors = {
            "webkit": "-webkit-transform",
            "ms": "-ms-transform",
            "o": "-o-transform",
            "moz": "-moz-transform",
            "standard": "transform"
        };
        var cssText = '';
        var index = common.index(target,this.selections);
        this.currentIndex=index;
        this.offsetY=-this.width*this.currentIndex;
        for(var j=0;j<this.selections.length;j++){
            if(common.index(this.selections[j],this.selections)===index){
                common.addClass(this.selections[j],'active');
            }else{
                common.removeClass(this.selections[j],'active');
            }
        }
        if(this.supported){
            for(var key in vendors){
                cssText+=vendors[key]+":translate("+(this.offsetY)+"px,0);";
            }
        }else{
            cssText+=";left:"+this.offsetY+"px;";
        }
        this.ele.style.cssText +=cssText;
    };

    /**
     * 轮播图启动
     * @returns {number}
     */
    Carousel.prototype.play = function () {
        var that = this;
       var timer = setInterval(function () {
           that.next(that);
       },that.DURATION);
       return timer;
    };

    /**
     * 轮播图暂停
     * @param obj 当前轮播图对象
     */
    Carousel.prototype.pause = function (obj) {
        clearInterval(obj.paused);
        obj.paused = false;
    };

    /**
     * 返回一个轮播图实例
     */
    return function () {
        return new Carousel();
    }
})