var cca_left2 = echarts.init(document.getElementById("left2"),"white");

// var xData = function() {
//     var data = [];
//     for (var i = 1; i <= 12; i++) {
//         data.push(i + "月");
//     }
//     return data;
// }();

cca_left2_option = {
  title: {
    text: '素食',
    subtext: '餐饮消费关联关系',
    textStyle: {
        color: '#036'
    },
},
backgroundColor: "",
tooltip: {
    // trigger: "axis",
    // axisPointer: {
    //     type: "shadow",
    //     textStyle: {
    //         color: "#fff"
    //     }

    // },
},
grid: {
    borderWidth: 0,
    top: 130,
    bottom: 30,
    textStyle: {
        color: "#fff"
    }
},
legend: {
    x: '80%',
    top: '5%',
    textStyle: {
        color: '#90979c',
    },
    data: ['评论量']
},
calculable: true,
xAxis: [{
    type: "category",
    axisLine: {
        lineStyle: {
            color: "black",
        }
    },
    axisLabel: {
        textStyle: {
            color: 'black',//坐标值得具体的颜色

        }
    },
    splitLine: {
        show: false
    },
    axisTick: {
        show: false
    },
    // data: xData,
    data: ['素食','火锅','烧烤烤串','饮品店']
}],

yAxis: [{
    type: "value",
    splitLine: {
        show: false
    },
    axisLine: {
        lineStyle: {
            color: "black",
        }
    },
    axisLabel: {
        textStyle: {
            color: 'black',//坐标值得具体的颜色

        }
    },

}],
series: [{
    top: "20%",
    name: "评论量",
    type: "bar",
    symbolSize: 10,
    symbol: 'circle',
    itemStyle: {
        color: "#6f7de3",
    },
    markPoint: {
        label: {
            normal: {
                textStyle: {
                    color: '#fff'
                }
            }
        },
        data: [{
            type: 'max',
            name: '最大值',

        }, {
            type: 'min',
            name: '最小值'
        }]
    },
    data: [83,51,11,8],
}]
};

cca_left2_option_2 = {
    title: {
        text: '',
        subtext: '餐饮消费关联关系',
        textStyle: {
            color: '#036'
        },
    },
    backgroundColor: "",
    tooltip: {
        // trigger: "axis",
        // axisPointer: {
        //     type: "shadow",
        //     textStyle: {
        //         color: "#fff"
        //     }

        // },
    },
    grid: {
        borderWidth: 0,
        top: 130,
        bottom: 30,
        textStyle: {
            color: "#fff"
        }
    },
    legend: {
        x: '80%',
        top: '5%',
        textStyle: {
            color: '#90979c',
        },
        data: ['评论量']
    },
    calculable: true,
    xAxis: [{
        type: "category",
        axisLine: {
            lineStyle: {
                color: "black",
            }
        },
        axisLabel: {
            textStyle: {
                color: 'black',//坐标值得具体的颜色

            }
        },
        splitLine: {
            show: false
        },
        axisTick: {
            show: false
        },
        // data: xData,
        data: []
    }],

    yAxis: [{
        type: "value",
        splitLine: {
            show: false
        },
        axisLine: {
            lineStyle: {
                color: "black",
            }
        },
        axisLabel: {
            textStyle: {
                color: 'black',//坐标值得具体的颜色

            }
        },

    }],
    series: [{
        top: "20%",
        name: "评论量",
        type: "bar",
        symbolSize: 10,
        symbol: 'circle',
        itemStyle: {
            color: "#6f7de3",
        },
        markPoint: {
            label: {
                normal: {
                    textStyle: {
                        color: '#fff'
                    }
                }
            },
            data: [{
                type: 'max',
                name: '最大值',

            }, {
                type: 'min',
                name: '最小值'
            }]
        },
        data: [],
    }]
};


// cca_left2_option = {
//     xAxis: {
//       type: 'category',
//       data: []
//     },
//     yAxis: {
//       type: 'value'
//     },
//     series: [
//       {
//         data: [],
//         type: 'bar'
//       }
//     ]
//   };
cca_left2.setOption(cca_left2_option);
