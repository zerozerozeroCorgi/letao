$(function () {

    var queryObj = {
        proName : "",
        brandId : "",
        price : "",
        num : "",
        page : 1,
        pageSize : 6
    }
    queryObj.proName = queryProduct("key");

    // 数据数量
    var Count = 0;

    mui.init({
        pullRefresh : {
            container:"#refreshContainer",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
            down : {
                height:50,//可选,默认50.触发下拉刷新拖动距离,
                auto: true,//可选,默认false.首次加载自动下拉刷新一次
                contentdown : "下拉可以刷新",//可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
                contentover : "释放立即刷新",//可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
                contentrefresh : "正在刷新...",//可选，正在刷新状态时，下拉刷新控件上显示的标题内容
                callback : function () {  //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
                    setTimeout(function() {
                        queryObj.page = 1;
                        queryProduct(function (result) {
                            Count = result.count;
                            var html = template("productListTpl", result);
                            $(".sportLife").html(html);
                        })
                        mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
                        // 重置上拉控件的用户提示
                        mui('#refreshContainer').pullRefresh().refresh(true);
                    }, 1000);
                } 
            },
            up : {
                height:50,//可选.默认50.触发上拉加载拖动距离
                auto:true,//可选,默认false.自动上拉加载一次
                contentrefresh : "正在加载...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
                contentnomore:'没有更多数据了',//可选，请求完毕若没有更多数据时显示的提醒内容；
                callback : function () { //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
                    setTimeout(function() {
                        var totalPage = Math.ceil(Count / queryObj.pageSize);
                        if (queryObj.page < totalPage) {
                            queryObj.page++;
                            queryProduct(function (result) {
                                var html = template("productListTpl", result);
                                $(".sportLife").append(html);
                            })
                             mui('#refreshContainer').pullRefresh().endPullupToRefresh(false);
                        } else {
                             mui('#refreshContainer').pullRefresh().endPullupToRefresh(true);
                        }
                       
                    }, 1000);
                } 
            }
        }
    });


    function queryProduct (callback) {
        $.ajax({
            url : "/product/queryProduct",
            type : "get",
            data : queryObj,
            success : function (result) {
                callback && callback(result);
            }
        });
    }


    

    // 点击工具栏上的a标签将商品排序
    $(".orderBar>a").on("tap", function () {
        $(this).addClass("active").siblings().removeClass("active");
        $(this).children(".mui-icon").toggleClass("mui-icon-arrowdown mui-icon-arrowup");
        var sort = 0;
        if ($(this).children(".mui-icon").hasClass("mui-icon-arrowdown")) {
            sort = 2;
        } else if ($(this).children(".mui-icon").hasClass("mui-icon-arrowup")) {
            sort = 1;
        }
        console.log(sort);
        if ($(this).data("type") == "price") {
            queryObj.price = sort;
            queryObj.num = "";
        } else if ($(this).data("type") == "num") {
            queryObj.num = sort;
            queryObj.price = "";
        }
        // 手动触发下拉 
        mui("#refreshContainer").pullRefresh().pulldownLoading();
    });

    

    $(".searchBtn").on("tap", function () {
        var value = $.trim($(".searchTxt").val());
        if (!value) {
            mui.toast("请输入搜索内容！");
            return;
        } else {
            queryObj.proName = value;
            mui("#refreshContainer").pullRefresh().pulldownLoading();
        }
    })

    //点击立即购买跳转到商品详情
    $(".sportLife").on("tap", ".buy_now", function () {
        var id = $(this).data("productid");
        console.log(id);
        location.href = "./product.html?productId=" + id;
    })

})