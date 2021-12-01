function get_left1_data() {// 获取left1区域数据
    $.ajax({
        url:"/get_left1_data",
        type:"get",
        dataType:"json",
        success:function (data) {
            // 将数据渲染到页面上
            // console.log(data);
            cca_left1_option.series[0].data = data.data;
            cca_left1.setOption(cca_left1_option);
        },
        error:function (xhr,type,errorThrown) {
            alert("发送ajax请求失败")
        }
    })
}

function get_left2_data() {// 获取left2区域数据
    $.ajax({
        url:"/get_left2_data",
        type:"get",
        dataType:"json",
        success:function (data) {
            // 将数据渲染到页面上
            cca_left2_option.series[0].data = data.yAxis_2013;
            cca_left2_option.series[1].data = data.yAxis_2014;
            cca_left2_option.series[2].data = data.yAxis_2015;
            cca_left2_option.series[3].data = data.yAxis_2016;
            cca_left2_option.series[4].data = data.yAxis_2017;
            cca_left2_option.series[5].data = data.yAxis_2018;
            cca_left2_option.series[6].data = data.yAxis_2019;
            cca_left2.setOption(cca_left2_option);// 第二个参数为true 设置重绘
        },
        error:function (xhr,type,errorThrown) {
            alert("发送ajax请求失败")
        }
    })
}

function get_left2_data_2(type) {// 获取left2区域数据
    $.ajax({
        url:"/get_left2_data_2",
        type:"post",
        dataType:"json",
        data: JSON.stringify({
                   "type":type
              }),
        success:function (data) {
            // 将数据渲染到页面上
            cca_left2_option_2.series[0].data = data.data;
            cca_left2.clear();// 清除option便于重新设置
            cca_left2.setOption(cca_left2_option_2);
        },
        error:function (xhr,type,errorThrown) {
            console.log(xhr);
            console.log(type);
            console.log(errorThrown);
        }
    })
}

function get_center_data(count) {// 获取center区域数据
    $.ajax({
        url:"/get_center_data",
        type:"POST",
        dataType:"json",
        data: JSON.stringify({
                   "count":count
              }),
        success:function (data) {
            // 将数据渲染到页面上
            mapPoints = mapPoints.concat(data.data);
            // 遍历mapPoints创建标注点
            createMarks(data.data);

        },
        error:function (xhr,type,errorThrown) {
            console.log(xhr);
            console.log(type);
            console.log(errorThrown);
        }
    })
}

function get_right2_data() {
    $.ajax({
        url:"/get_right2_data",
        type:"get",
        dataType:"json",
        success:function (data) {
            // 将数据渲染到页面上
            cca_right2_option_2.series[0].data = data.data;
            cca_right2.setOption(cca_right2_option_2)
        },
        error:function (xhr,type,errorThrown) {
            alert("发送ajax请求失败")
        }
    })
}

// function get_left3_data() {// 获取left1区域数据
//     $.ajax({
//         url:"/get_left3_data",
//         type:"get",
//         dataType:"json",
//         success:function (data) {
//             // 将数据渲染到页面上
//             // console.log(data);

//             cca_left3_option.series[0].data = data.data;
//             cca_left3.setOption(cca_left3_option);
            
//         },
//         error:function (xhr,type,errorThrown) {
//             alert("发送Aajax请求失败")
//         }
//     })
// }

// 获取词云数据
get_left1_data();
// 获取折线图数据
get_left2_data();
// 获取柱状图数据
get_right2_data();
// 分次延时获取地图数据

// get_left3_data()

function get_center_data_all(i) {
    get_center_data(i);
    if (i < 11) {
        console.log("第"+i+"次请求地图数据");
        setTimeout(function() {
           get_center_data_all(i + 1);
        }, 1000)
    }
}
get_center_data_all(1);
