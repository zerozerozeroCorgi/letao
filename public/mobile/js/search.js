$(function () {
    loadHistory();
    function loadHistory() {
        var ls  = localStorage;
        var arr = (ls.getItem("LT_search_history") && JSON.parse(ls.getItem("LT_search_history"))) || [];
        if (arr.length <= 0) {
            $(".search_history_list").html("");
            return;
        }
        var strArr = [];
        for (var i = 0, len = arr.length; i < len; i++) {
            strArr.push('<a href="javascript:;" class="mui-clearfix"><span class="search_history_content mui-pull-left">' + arr[i] + '</span><span class="icon_delete fa fa-close mui-pull-right"></span></a>');
        }
        $(".search_history_list").html(strArr.join(""));
    }

    $(".searchBtn").on("tap", function () {
        var ls  = localStorage;
        var arr = (ls.getItem("LT_search_history") && JSON.parse(ls.getItem("LT_search_history"))) || [];
        var value = $.trim($(".searchTxt").val());
        if (!value) {
            return;
        }
        for (var i = 0, len = arr.length; i < len; i++) {
            if (value == arr[i]) {
                arr.splice(i, 1);
            }
        }
        arr.unshift(value);
        ls.setItem("LT_search_history", JSON.stringify(arr));
        location.href = "./searchList.html?key=" + value;
    })

    $(".clearbtn").on("tap", function () {
        var ls  = localStorage;
        ls.removeItem("LT_search_history");
        loadHistory();
    })

    $(".search_history_list").on("tap", ".icon_delete", function () {
        var ls  = localStorage;
        var arr = (ls.getItem("LT_search_history") && JSON.parse(ls.getItem("LT_search_history"))) || [];
        var index = $(this).parent().index();
        arr.splice(index, 1);
        ls.setItem("LT_search_history", JSON.stringify(arr));
        loadHistory();
    })



})



























// $(function () {
//     loadHistory();

//     // 页面刷新加载localstorage
//     function loadHistory () {
//         var ls = localStorage;
//         var arr = (ls.getItem("LT_search_history") && JSON.parse(ls.getItem("LT_search_history"))) || [];
//         if (arr.length < 1) {
//             $(".search_history_list").html("");
//             return;
//         }
//         var strArr = [];
//         for (var i = 0, len = arr.length; i < len; i++) {
//             strArr.push('<a href="javascript:;" class="mui-clearfix"><span class="search_history_content mui-pull-left">' + arr[i] + '</span><span class="icon_delete fa fa-close mui-pull-right deleteBtn"></span></a>');
//         }
        
//         $(".search_history_list").html(strArr.join(""));
//     }

//     // 点击搜索按钮，将搜索记录存放到localStorage中，如果原localStorage有，删除原记录，将搜索几率提到最前
//     $(".searchBtn").on("tap", function () {
//         var ls = localStorage;
//         var arr = (ls.getItem("LT_search_history") && JSON.parse(ls.getItem("LT_search_history"))) || [];

//         var value = $.trim($(".searchTxt").val());
//         if (!value) {
//             return;
//         }

//         // 去重
//         for (var i = 0, len = arr.length; i < len; i++) {
//             if (arr[i] == value) {
//                 arr.splice(i, 1);
//             }
//         }
//         arr.unshift(value);
//         ls.setItem("LT_search_history", JSON.stringify(arr));
//         loadHistory();
//     })

//     // 点击清空记录，删除localStorage中属性LT_search_history的属性值
//     $(".clearbtn").on("tap", function () {
//         var ls = localStorage;
//         // var arr = (ls.getItem("LT_search_history") && JSON.parse(ls.getItem("LT_search_history"))) || [];
//         ls.removeItem("LT_search_history");
//         loadHistory();
//     })

//     // 点击x按钮，删除当前搜索记录
//     $(".search_history_list").on("tap", ".deleteBtn", function () {
//         var ls = localStorage;
//         var arr = (ls.getItem("LT_search_history") && JSON.parse(ls.getItem("LT_search_history"))) || [];
//         var index = $(this).parent().index();
//         arr.splice(index, 1);
//         ls.setItem("LT_search_history", JSON.stringify(arr));
//         loadHistory();
//     })

// })