var map = new BMap.Map("center",{enableMapClick: false,coordsType: 5});

map.enableScrollWheelZoom(); //启用滚轮放大缩小，默认禁用
map.enableContinuousZoom(); //启用地图惯性拖拽，默认禁用
var top_left_control = new BMap.ScaleControl({anchor: BMAP_ANCHOR_TOP_LEFT});// 左上角，添加比例尺
var top_left_navigation = new BMap.NavigationControl({type:BMAP_NAVIGATION_CONTROL_SMALL}); //左上角，添加默认缩放平移控件
map.addControl(top_left_control);
map.addControl(top_left_navigation);

var styleOptions = {
    strokeColor:"red",    //边线颜色。
    fillColor:"red",      //填充颜色。当参数为空时，圆形将没有填充效果。
    strokeWeight: 3,       //边线的宽度，以像素为单位。
    strokeOpacity: 0.8,    //边线透明度，取值范围0 - 1。
    fillOpacity: 0.6,      //填充的透明度，取值范围0 - 1。
    strokeStyle: 'solid' //边线的样式，solid或dashed。
};
// 实例化鼠标绘制工具
var drawingManager = new BMapLib.DrawingManager(map, {
    isOpen: false, //是否开启绘制模式
    enableDrawingTool: true, //是否显示工具栏
    drawingToolOptions: {
        anchor: BMAP_ANCHOR_TOP_RIGHT, //位置
        offset: new BMap.Size(5, 5), //偏离值
        drawingModes:[BMAP_DRAWING_RECTANGLE] ,// 画矩形
    },
    rectangleOptions: styleOptions //矩形的样式
});

var overlays = [];// 存储矩形绘制物
var labels = [];// 存储区域label
// 添加鼠标绘制工具监听事件，用于获取绘制结果
drawingManager.addEventListener('overlaycomplete', function(e){
     overlays.push(e.overlay);
    // 最多比较三个区域
    if(overlays.length <= 3){
        //区域名称
        var name = "区域"+overlays.length.toString();
        var path = e.overlay.getPath();//Array<Point> 返回多边型的点数组
        var poi_left_top = new BMap.Point(path[0].lng,path[0].lat);
        var poi_right_bottom = new BMap.Point(path[2].lng,path[2].lat);
        // for(var i=0;i<path.length;i++){
        //     console.log("lng:"+path[i].lng+"\n lat:"+path[i].lat);
        // }
        label = new BMap.Label(name,{offset: new BMap.Size(1,-1),position:poi_left_top});
        map.addOverlay(label);// 为区域添加标题
        labels.push(label);
        // 遍历全图标注点  判断是否经过了筛选
        var temp_mapPoints = [];
        if(time_mapPoints.length === 0){
            temp_mapPoints = [].concat(mapPoints);
        }else{
            temp_mapPoints = [].concat(time_mapPoints);
        }
        new_mapPoints = [];// 存储符合条件的点
        for(var i = 0;i<temp_mapPoints.length;i++){
            // 判断该点是否在矩形区域内
            if(temp_mapPoints[i].longitude >= poi_left_top.lng
                && temp_mapPoints[i].longitude <= poi_right_bottom.lng
                && temp_mapPoints[i].latitude <= poi_left_top.lat
                && temp_mapPoints[i].latitude >= poi_right_bottom.lat){
                new_mapPoints.push(temp_mapPoints[i]);
            }
        }
        // 将符合条件的点数据绘制上柱状图
        // 店铺数量
        var shop_count = new_mapPoints.length;
        // 店铺种类集合
        var shop_type_arr = [];
        // 店铺评论总量
        var shop_comment_count = 0;
        for(var j = 0; j < shop_count;j++){
            shop_comment_count += new_mapPoints[j].commentCount;
            shop_type_arr.push(new_mapPoints[j].type);
        }
        let arr = [...new Set(shop_type_arr)];//列表去重
        // 店铺种类数量
        shop_type_count = arr.length;
        if(overlays.length === 1){
            cca_right2_option.legend.data = [];
            cca_right2_option.series = [];
        }
        // console.log(name);
        // console.log(shop_comment_count);
        // console.log(shop_count);
        // console.log(shop_type_count);
        cca_right2_option.legend.data.push(name);
        var series = {
            name: name,
            type: 'bar',
            barGap: 0,
            label: labelOption,
            data: [shop_comment_count, shop_count, shop_type_count]
        };
        cca_right2_option.series.push(series);
        cca_right2.setOption(cca_right2_option);

    }else{
        tip.msg("最多只能比较三个区域");
    }
});

// 清除矩形绘制物
function clearAll() {
    // 清空绘制区域
    for(var i = 0; i < overlays.length; i++){
        map.removeOverlay(overlays[i]);
    }
    // 清空label
    for(var i = 0; i < labels.length; i++){
        map.removeOverlay(labels[i]);
    }
    overlays.length = 0;
    // 清空柱状图
    cca_right2.clear();
    cca_right2.setOption(cca_right2_option_2);
}

var point = new BMap.Point(104.740738,31.493208);// 设置当前位置

map.centerAndZoom("绵阳", 15);// 设置中心点

var mapPoints = [];// 存储所有的店铺信息

// 定义一个控件类,即function
function ZoomControl(){
  // 默认停靠位置和偏移量
  this.defaultAnchor = BMAP_ANCHOR_TOP_RIGHT;
  this.defaultOffset = new BMap.Size(10, 70); // 距离左上角位置
}

// 通过JavaScript的prototype属性继承于BMap.Control
ZoomControl.prototype = new BMap.Control();

// 自定义控件必须实现自己的initialize方法,并且将控件的DOM元素返回
// 在本方法中创建个div元素作为控件的容器,并将其添加到地图容器中
ZoomControl.prototype.initialize = function(map){
  // 创建一个DOM元素
  var div = document.createElement("div");
  // 添加文字说明
  div.appendChild(document.createTextNode("清除矩形区域"));
  // 设置样式
  div.style.cursor = "pointer";
  div.style.border = "1px solid gray";
  div.style.borderRadius = "5px";
  div.style.padding = "2px";
  div.style.color = "white";
  div.style.backgroundColor = "skyblue";
  // 绑定事件,点击一次放大两级
  div.onclick = function(e){
    clearAll();// 动作
  };
  // 添加DOM元素到地图中
  map.getContainer().appendChild(div);
  // 将DOM元素返回
  return div;
};
// 创建控件
var myZoomCtrl = new ZoomControl();
// 添加到地图当中
map.addControl(myZoomCtrl);

// 函数 创建多个标注
function generateWordCloud() {

}

function markerFun(points,label,infoWindows,mapPoints) {
    var markers = new BMap.Marker(points);
    map.addOverlay(markers);
    markers.setLabel(label);
    markers.addEventListener("click",function (event) {
        map.openInfoWindow(infoWindows,points);//参数：窗口、点  根据点击的点出现对应的窗口
        //get_left3_data(4615402)
        wc_img = document.getElementById("img_wc")

        // document.write(Object.getOwnPropertyNames(points));
        // document.write(points.lng);
        // document.write(points.lng);
        // document.write(points.lng);
        for(var i=0;i<mapPoints.length;i++){
            
            if(mapPoints[i].longitude==points.lng)
                cid=mapPoints[i].poiId;     
        }

        //cid = 4615402
        wc_img.setAttribute("src",'/get_left3_data_2?id='+cid+"&seed="+Math.random())
        //l3_data(4615402)
    });
}
// 遍历mapPoints创建标注点
function createMarks(mapPoints) {
    for (var i = 0;i<mapPoints.length;i++) {
        var points = new BMap.Point(mapPoints[i].longitude,mapPoints[i].latitude);//创建坐标点
        var opts = {
            width:250,
            height: 300,
            enableMessage: true, //设置允许信息窗发送短息
            title:'<h4>'+mapPoints[i].name+'</h4>'
        };
        var label = new BMap.Label(mapPoints[i].name,{
            offset:new BMap.Size(25,5)
        });
        var specialDishes = "";
        if(mapPoints[i].recommended[0]==="无"){
            specialDishes = "<br>无特色菜信息"
        }else{
            specialDishes = "<br>特色菜:<br>";
            for(var j = 0;j < mapPoints[i].recommended.length;j++){
                specialDishes += "<img style='width: 70px;height:60px;margin-left:10px;margin-top: 3px;' src='"+mapPoints[i].recommended[j].frontImgUrl+"'>"
            }
            for(var j = 0;j < mapPoints[i].recommended.length;j++){
                specialDishes += "<br>"+mapPoints[i].recommended[j].name+"&nbsp;&nbsp;价格:"+mapPoints[i].recommended[j].price+"元";
            }
        }
        // route_plan = "<button class='line_btn' onclick='get_line("+mapPoints[i].longitude+","+mapPoints[i].latitude+")'>到这去</button>";
        var infoWindows = new BMap.InfoWindow("地址:"+mapPoints[i].address+"<br>营业时间:"+mapPoints[i].openTime+"<br>电话:"+mapPoints[i].phone+"<br>平均消费:"+mapPoints[i].avgPrice+"元"+specialDishes,opts);
        markerFun(points,label,infoWindows,mapPoints);
        // print(mapPoints[i].poiid)
        
    }
}



// function click_on_shop(data)
// {
//     console.log(data);
//     cname = data['name']
//     cid = data['poiid']

//     l3_data(cid)

//     show_shop_detail(cname,cid)
//     // wc_img = document.getElementById("wc_img")
//     // wc_img.setAttribute("src",'/wordcloud?id='+cid+"&seed="+Math.random()+"&type=shop&meal_only="+meals_flag )
//     // bring_view_2top('shop')
// }
