$(function () {
    queryTopCategory();
    querySecondCategory(1);

    $(".category_left>ul").on("tap", "li", function () {
        $(this).addClass("active").siblings().removeClass("active");
        var id = $(this).find("a").data("id");
        querySecondCategory(id);
    })

    function queryTopCategory() {
        maskShow();
        $.ajax({
            url : "/category/queryTopCategory",
            success : function (result) {
                var rows = result.rows;
                var strArr = [];
                for (var i = 0, len = rows.length; i < len; i++) {
                    strArr.push('<li><a data-id=' + rows[i].id + ' href="javascript:;">' + rows[i].categoryName + '</a></li>');
                }
                $(".category_left>ul").html(strArr.join(""));
                $(".category_left li").eq(0).addClass("active");
                maskClose();
            }
        });
    }

    function querySecondCategory(id) {
        maskShow();
        $.ajax({
            url : "/category/querySecondCategory?id=" + id,
            success : function (result) {
                var rows = result.rows;
                if (rows.length > 0) {
                    var strArr = [];
                    for (var i = 0, len = rows.length; i < len; i++) {
                        strArr.push('<li><a href="javascript:;" data-id="'+rows[i].id+'" data-hot="'+rows[i].hot+'"><img src="'+rows[i].brandLogo+'" alt=""><span>'+rows[i].brandName+'</span></a></li>')
                    }
                    $(".category_right>ul").html(strArr.join(""));
                } else {
                    mui.toast("暂无数据！");
                }
                maskClose();
            }
        })
    }

    
})