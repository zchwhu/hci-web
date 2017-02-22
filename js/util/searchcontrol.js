/**
 * Created by Administrator on 2017/2/18.
 */
define(['./common.js'],function (common) {
    var searchControl = function () {
        var hciSearch = document.getElementById('hciSearch');
        if(common.hasClass(hciSearch,'focus')){
            common.removeClass(hciSearch,'focus');
        }else{
            common.addClass(hciSearch,'focus');
        }
    }
    return {
        searchcontrol:searchControl
    }
})