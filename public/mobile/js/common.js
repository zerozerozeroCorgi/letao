// 获取url上的参数
function getURLParams(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
    return unescape(r[2]);
    }
    return null;
}

var mask = mui.createMask();
// 遮罩层
function maskShow() {
    mask.show();
    $(".fa-spinner").show();
}
function maskClose() {
    mask.close();
    $(".fa-spinner").hide();
}