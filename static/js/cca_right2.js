var cca_right2 = echarts.init(document.getElementById("right2_1"));


// var labelOption = {
//     show: true,
//     position: 'insideBottom',
//     distance: 15,
//     align: 'left',
//     verticalAlign: 'middle',
//     rotate: 90,
//     formatter: '{c}  {name|{a}}',
//     fontSize: 16,
//     rich: {
//         name: {
//             textColor: '#49ffdf',
//         }
//     },
//     textStyle: {
//         color: '#6f7de3'
//     }

// };
// 显示所有店铺总览
cca_right2_option_2 = {

  tooltip: {
    trigger: 'item'
  },
  legend: {
    top: '5%',
    left: 'center'
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 2
      },
      label: {
        show: false,
        position: 'center'
      },
      emphasis: {
        label: {
          show: true,
          fontSize: '40',
          fontWeight: 'bold'
        }
      },
      labelLine: {
        show: false
      },
      data: [
        { value: 1048, name: 'Search Engine' },
        { value: 735, name: 'Direct' },
        { value: 580, name: 'Email' },
        { value: 484, name: 'Union Ads' },
        { value: 300, name: 'Video Ads' }
      ]
    }
  ]


    // title: {
    //     text: '所有店铺数据',
    //     subtext: '',
    //     textStyle: {
    //         color: '#036'
    //     },
    // },
    // color: ['#003366', '#006699', '#4cabce', '#e5323e'],
    // backgroundColor: "",
    // tooltip: {
    //     trigger: 'axis',
    //     axisPointer: {
    //         type: 'shadow'
    //     }
    // },
    // legend: {
    //     data: ["所有店铺"],
    //     textStyle:{
    //        color:'#036'
    //     }
    // },
    // grid: {
    //     borderWidth: 0,
    //     left: 60,
    //     bottom: 30,
    //     textStyle: {
    //         color: "blue"
    //     }
    // },
    // xAxis: [
    //     {
    //         type: 'category',
    //         axisTick: {show: false},
    //         data: ['店铺评论量', '店铺量', '店铺种类'],
    //         axisLine: {
    //             lineStyle: {
    //                 color: "black",
    //             }
    //         },
    //         axisLabel: {
    //             textStyle: {
    //                 color: 'black',//坐标值得具体的颜色
    //             }
    //         },
    //     }
    // ],
    // yAxis: [
    //     {
    //         type: 'value',
    //         axisLine: {
    //             lineStyle: {
    //                 color: "black",
    //             }
    //         },
    //         axisLabel: {
    //             textStyle: {
    //                 color: 'black',//坐标值得具体的颜色
    //             }
    //         },
    //     }
    // ],
    // series: [{
    //     name: "所有店铺",
    //     type: 'bar',
    //     barGap: 0,
    //     label: labelOption,
    //     data: []
    // }]
};
// 用于比较矩形区域
// cca_right2_option = {

    

    // title: {
    //     text: '区域店铺数据对比',
    //     subtext: '餐饮消费行为的地域特征'
    // },
    // color: ['#003366', '#006699', '#4cabce', '#e5323e'],
    // backgroundColor: "",
    // tooltip: {
    //     trigger: 'axis',
    //     axisPointer: {
    //         type: 'shadow'
    //     }
    // },
    // legend: {
    //     x: '46%',
    //     textStyle:{
    //        color:'#036'
    //     },
    //     data: []
    // },
    // xAxis: [
    //     {
    //         type: 'category',
    //         axisTick: {show: false},
    //         data: ['店铺评论量', '店铺量', '店铺种类']
    //     }
    // ],
    // yAxis: [
    //     {
    //         type: 'value'
    //     }
    // ],
    // series: []
// };

cca_right2.setOption(cca_right2_option_2);