/**
 * Created by Administrator on 2017/2/23.
 */
define(function () {
    var requestAnimationFrame = (function () {
        return window.requestAnimationFrame
            || window.webkitRequestAnimationFrame
            || window.mozRequestAnimationFrame
            || window.oRequestAnimationFrame
            || function (callback) {
                return window.setTimeout(callback, 1000/60);
            };
    })();

    var cancelAnimationFrame = (function () {
        return window.cancelAnimationFrame
            || window.webkitCancelAnimationFrame
            || window.mozCancelAnimationFrame
            || window.oCancelAnimationFrame
            || function (id) {
                return window.clearTimeout(id)
            };
    })();

    return {
        requestAnimation: requestAnimationFrame,
        cancelAnimation: cancelAnimationFrame
    }
});