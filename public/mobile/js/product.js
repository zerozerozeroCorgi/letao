$(function () {
    mui('.mui-scroll-wrapper').scroll({
	    scrollY: true, //是否竖向滚动
        scrollX: false, //是否横向滚动
        startX: 0, //初始化时滚动至x
        startY: 0, //初始化时滚动至y
        indicators: false, //是否显示滚动条
        deceleration:0.0006, //阻尼系数,系数越小滑动越灵敏
        bounce: true //是否启用回弹
    });

    

    var id = getURLParams("productId");
    queryProductDetail(id);

    function queryProductDetail(id) {
        maskShow();
        $.ajax({
            url : "/product/queryProductDetail?id=" + id,
            success : function (result) {
                var arr = result.size.split("-");
                var startSize = parseInt(arr[0]);
                var endSize = parseInt(arr[1]);
                var arr1 = [];
                for (var i = startSize; i <= endSize; i++) {
                    arr1.push(i);
                }
                console.log(arr1);
                result.sizeArr = arr1;
                var html = template("productTpl", result);
                $(".mui-scroll").html(html);
                $(".size").eq(0).addClass("on");
                // 轮播图
                mui('.mui-slider').slider({
                    interval : 1000//自动轮播周期，若为0则不自动播放，默认为0；
                });

                // 数量输入框
                mui(".mui-numbox").numbox();

                maskClose();
            }
        });
    }

    $(".mui-scroll").on("tap", ".size", function () {
        $(this).addClass("on").siblings().removeClass("on");
    })

})