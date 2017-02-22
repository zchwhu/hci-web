/**
 * Created by Administrator on 2017/2/18.
 */
define(function () {
    /**
     * 控制元素上拉和下拉
     * @param ele dom元素
     * @param isShow 元素显示状态，boolean值
     */
    var slideToggle = function (ele,isShow) {
        if (typeof window.screenX === "number") {
            isShow = !isShow;
            ele && (ele.style.height = isShow ? (function () {
                var height = 0;
                Array.prototype.slice.call(ele.childNodes).forEach(function (child) {
                    if (child.nodeType === 1) {
                        var oStyle = window.getComputedStyle(child);
                        height = child.clientHeight + (parseInt(oStyle.borderTopWidth) || 0) + (parseInt(oStyle.borderBottomWidth) || 0);
                    }
                });
                return height;
            })() + "px" : "0px");
        }else{
            isShow = !isShow;
            ele && (ele.style.height = isShow? "auto": "0px");
        }
    };
    return{
        slideToggle:slideToggle
    }
})