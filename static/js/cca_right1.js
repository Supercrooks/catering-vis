var sale_begin = document.getElementById('sale_begin');
var sale_end = document.getElementById('sale_end');
var score = document.getElementsByName('score');
var classify = document.getElementsByName('classify');
// 当前位置的经纬度
var cur_lng = 0;
var cur_lat = 0;
// 获取个性化的数据
function get_input() {
    var evaluate = [];
    for (var i = 0; i < score.length; i++) {
        if (score[i].checked) {
            evaluate.push(score[i].value);
        }
    }
    var menu = [];
    for (var i = 0; i < classify.length; i++) {
        if (classify[i].checked) {
            menu.push(classify[i].value);
        }
    }
    // 存储筛选出的店铺
    new_mapPoints = [];

    if(sale_begin.value === "" || sale_end.value === ""){
        tip.msg("请填写预算")
    }else{
        if(menu.length === 0){
            tip.msg("请选择菜品类别")
        }else{
            if(evaluate.length === 0){
                tip.msg("请选择店铺评分")
            }else{
                var temp_mapPoints = [];
                if(temp_mapPoints.length === 0){
                    temp_mapPoints = [].concat(mapPoints);
                }else{
                    temp_mapPoints = [].concat(time_mapPoints);
                }
                for(var i = 0;i<temp_mapPoints.length;i++){
                    if(mapPoints[i].avgPrice > sale_begin.value
                        && mapPoints[i].avgPrice < sale_end.value
                        && menu.includes(mapPoints[i].type)
                        && evaluate.includes(Math.floor(mapPoints[i].avgScore).toString())){
                        new_mapPoints.push(mapPoints[i]);
                    }
                }
                tip.msg("搜索结果:"+new_mapPoints.length.toString()+"个");
                map.clearOverlays(); //删除所有点
                // 遍历mapPoints创建标注点
                createMarks(new_mapPoints);
                // 当定位后创建当前位置标注点
                if(cur_lng !== 0 && cur_lat !== 0){
                    var point = new BMap.Point(cur_lng,cur_lat);
                    set_cur_marker(point);
                }
            }
        }
    }
}
// 获取定位
function get_location() {
    //获取当前位置的经纬度
    var cid = 35;
    var geolocation = new BMap.Geolocation();
    geolocation.getCurrentPosition(function(r){
        if(this.getStatus() == BMAP_STATUS_SUCCESS){
            console.log("定位到当前位置");
            var position = {
                lng: r.point.lng,
                lat: r.point.lat
            };
            if(cid === 'sort'){
                sort(position);
            } else {
                positions(position, cid);
            }
            cur_lng = r.point.lng;
            cur_lat = r.point.lat;
            console.log(cur_lng);
            console.log(cur_lat);
            getAddress(cur_lng,cur_lat);
        }
        else {
            console.log('获取当前位置失败,请确定您开启了定位服务(采用默认定位)');
            //104.708004,31.543262  默认寝室位置
            cur_lng = 104.708004;
            cur_lat = 31.543262;
            getAddress(cur_lng,cur_lat);
        }
    },{enableHighAccuracy: true});
}

//该js函数是必须要的不然要报错
function positions(json, cid) {}

//根据经纬度获取具体地址信息
function getAddress(lng,lat){
    var point = new BMap.Point(lng,lat);
    set_cur_marker(point);
    map.centerAndZoom(point,15);// 调整中心位置
    var geoc = new BMap.Geocoder();
    geoc.getLocation(point,function(rs){
        var addComp = rs.addressComponents;
        var position = addComp.province + " " + addComp.city + " " + addComp.district + " " + addComp.street + " " + addComp.streetNumber;
        var location_now = document.getElementById('location_now');
        location_now.value = position;// 设置当前位置
     });
}

// 设置当前位置的标注
function set_cur_marker(point) {
    var marker = new BMap.Marker(point);
    marker.setAnimation(BMAP_ANIMATION_BOUNCE);//跳动的动画
    map.addOverlay(marker);
    var label = new BMap.Label("当前位置",{
            offset:new BMap.Size(25,5)
        });
    marker.setLabel(label);
}

// 路线规划
function get_line(end_lng,end_lat) {
    if(cur_lat === 0 || cur_lng === 0){
        tip.msg("请先定位");
    }else{
        // alert("开始进行路线规划");
        //js获取步行实例
        var walking = new BMap.WalkingRoute(map,{renderOptions:{}} );
        var start_point = new BMap.Point(cur_lng,cur_lat);
        var end_point = new BMap.Point(end_lng,end_lat);
        // 起点  终点
        walking.search(start_point,end_point);
        walking.setSearchCompleteCallback(function(results){
            var distance = results.getPlan(0).getDistance(true);
            tip.msg("路线规划成功,全程"+distance.toString());
            var pts = results.getPlan(0).getRoute(0).getPath();
            var polyline = new BMap.Polyline(pts, {strokeColor:"red", strokeWeight:3, strokeOpacity:0.7, strokeStyle:"dashed", id:'polyine'});
            // 删除上一次的路线规划
            var allOverlay = map.getOverlays();
            for (var i = 0; i < allOverlay.length; i++){
                if(allOverlay[i].toString().indexOf("Polyline") > 0){//删除折线
                    map.removeOverlay(allOverlay[i]);
                }
            }
            map.addOverlay(polyline);
            map.setViewport([start_point,end_point]);//调整到最佳视野
        });
    }
}