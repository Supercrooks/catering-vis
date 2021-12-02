var dom = document.getElementById("bottom");
var myChart = echarts.init(dom);

var xData = function() {
    var data = [];
    for (var i = 0; i <= 144; i++) {
        var t = i * 10;
        var hour = Math.floor(t / 60);
        var minute = t % 60;
        if(minute === 0){
            data.push(hour + ":00");
        }else{
            data.push(hour + ":" + minute);
        }

    }
    return data;
}();

myChart.setOption({
    backgroundColor: "",
    xAxis: [{
        type: "category",
        data: xData,
    }],
    yAxis: [{
        type: "value",
    }],
    dataZoom: [{
        show: true,
        height: 30,
        xAxisIndex: [0],
        bottom: 3,
        "start": 60,
        "end": 80,
        handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
        handleSize: '110%',
        handleStyle: {
            color: "#5B3AAE",
        },
        textStyle:{
            color:"#036",
        },
        fillerColor:"rgba(67,55,160,0.4)",
        borderColor: "rgba(204,187,225,0.5)",

    }, {
        type: "inside",
        show: true,
        height: 15,
        start: 1,
        end: 35
    }],

});

var time_mapPoints = [];

myChart.on('dataZoom', function(e) {
    console.log(e);   // All params
    time_start = e.start * 1.44;
    time_end = e.end * 1.44;
    time_mapPoints = [];
    for(var i = 0;i<mapPoints.length;i++){
        start = mapPoints[i].openTime_convert.start;
        end = mapPoints[i].openTime_convert.end;
        if(start < end){
            if(start > time_start && end < time_end){
                time_mapPoints.push(mapPoints[i])
            }
        }else{
            // start 120 end 20
            if(start < time_start){
                time_mapPoints.push(mapPoints[i])
            }else if(end > time_end){
                time_mapPoints.push(mapPoints[i])
            }
        }
    }
    map.clearOverlays(); //删除所有点
    overlays.length = 0;// 清空矩形区域数组
    // 遍历mapPoints创建标注点
    createMarks(time_mapPoints);
});