# -*- coding: utf-8 -*-
# @Time    : 2020/12/28 17:21
# @Author  : f
# @File    : utils.py
import time
import numpy as np
import json
import requests

#自定义序列化方法
class NpEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, np.integer):
            return int(obj)
        elif isinstance(obj, np.floating):
            return float(obj)
        elif isinstance(obj, np.ndarray):
            return obj.tolist()
        else:
            return super(NpEncoder, self).default(obj)

# 将时间戳转成指定的日期格式
def convert_date(timeStamp):
    timeArray = time.localtime(timeStamp)
    otherStyleTime = time.strftime("%Y年%m月", timeArray)# %Y年%m月%d日 %H:%M:%S
    # 2013--10--10 23:40:00
    return otherStyleTime

# 坐标系转换
def wgs84tobd09(lon,lat):
    api_url = "http://api.map.baidu.com/geoconv/v1/?coords={},{}&from=1&to=5&ak=k4NUsxZb6DuuOxQOoZqneCKRPp3St76v".format(lon,lat)
    res = requests.get(api_url)
    d = json.loads(res.text)
    return d["result"]

# 处理店铺营业时间
def convert_openTime(openTime):
    start = 0
    end = 0
    if isinstance(openTime, str):
        l = openTime.split(" ")
        if len(l) > 1:
            if l[1] == "全天" or l[1] == "周一至周日" or l[1] == "周五至周日":
                start = 0
                end = 144
            else:
                start_str = l[1].split("-")[0]
                end_str = l[1].split("-")[1]
                start = int(start_str.split(":")[0]) * 6 + int(start_str.split(":")[1]) / 10
                end = int(end_str.split(":")[0]) * 6 + int(end_str.split(":")[1]) / 10
        else:
            start = 0
            end = 144

    return {"start":start,"end":end}

# 处理店铺类别
def convert_shop_type(type_str):
    str = eval(type_str)[2]['title'][2:]
    if str[0:1] == "县" or str[0:1] == "区":
        return str[1:]
    return str