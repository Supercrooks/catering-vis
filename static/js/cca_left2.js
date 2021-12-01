var cca_left2 = echarts.init(document.getElementById("left2"),"dark");

var xData = function() {
    var data = [];
    for (var i = 1; i <= 12; i++) {
        data.push(i + "月");
    }
    return data;
}();

cca_left2_option = {
    title: {
        text: '2013年-2019年评论量',
        subtext: '餐饮消费行为的时序特征',
        textStyle: {
            color: '#036'
        },
    },
    backgroundColor: "",
    tooltip: {
        trigger: "axis",
        axisPointer: {
            type: "shadow",
            textStyle: {
                color: "#fff"
            }

        },
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
        x: '46%',
        top: '5%',
        textStyle: {
            color: '#90979c',
        },
        data: ['2013年评论量', '2014年评论量','2015年评论量', '2016年评论量','2017年评论量','2018年评论量','2019年评论量']
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
        data: xData,
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
        name: "2013年评论量",
        type: "line",
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
    },{
        name: "2014年评论量",
        type: "line",
        symbolSize: 10,
        symbol: 'circle',
        itemStyle: {
            color: "#51e0a2",
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
    },{
        name: "2015年评论量",
        type: "line",
        symbolSize: 10,
        symbol: 'circle',
        itemStyle: {
            color: "#6fdfe3",
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
    },{
        name: "2016年评论量",
        type: "line",
        symbolSize: 10,
        symbol: 'circle',
        itemStyle: {
            color: "#9ce36a",
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
    },{
        name: "2017年评论量",
        type: "line",
        symbolSize: 10,
        symbol: 'circle',
        itemStyle: {
            color: "#e2e36d",
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
    },{
        name: "2018年评论量",
        type: "line",
        symbolSize: 10,
        symbol: 'circle',
        itemStyle: {
            color: "#e37753",
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
    },{
        name: "2019年评论量",
        type: "line",
        symbolSize: 10,
        symbol: 'circle',
        itemStyle: {
            color: "#e376bd",
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

cca_left2_option_2 = {
    title: {
        text: '',
        subtext: '餐饮消费行为的时序特征',
        textStyle: {
            color: '#036'
        },
    },
    backgroundColor: "",
    tooltip: {
        trigger: "axis",
        axisPointer: {
            type: "shadow",
            textStyle: {
                color: "#fff"
            }

        },
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
        x: '46%',
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
        data: xData,
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
        type: "line",
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

cca_left2.setOption(cca_left2_option);
