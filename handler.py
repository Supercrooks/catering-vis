# -*- coding: utf-8 -*-
# @Time    : 2020/12/4 18:04
# @Author  : f
# @File    : utils.py

from typing import Text
import pandas as pd
import json
import util
import numpy as np
from PIL import Image

import io

import wordcloud
'''
呈现城市餐饮店铺时空特征分布

热门店铺特色美食
    评分最高的店铺
'''
comment_data_path = "./static/data/shop_comments.csv"
shop_data_path = "./static/data/shop_details.csv"
shop_data_path02 = "./static/data/shop_details02.csv"

comment_df = pd.read_csv(comment_data_path)
shop_df = pd.read_csv(shop_data_path)
shop_df02 = pd.read_csv(shop_data_path02)

# 对店铺类型作处理
shop_df03 = shop_df02.dropna(axis=0, how='any')
shop_df03["type"] = shop_df03["type"].apply(lambda x: util.convert_shop_type(x))

# 处理评论时间
comment_df["commentTime"] = comment_df["commentTime"].apply(lambda x: util.convert_date(x / 1000))




l = []  # 存储所有店铺信息的列表

def center_data(count):# 处理店铺信息
    global l
    if count == 1:# 第一次请求数据
        for row in shop_df02.iterrows():
            dict = {}  # 存储单个店铺信息的字典
            # 根据店铺id获取店铺评论量
            if list(row)[1]['poiId'] != "poiId": # 避免店铺字段为poiId
                comment_shop = comment_df[comment_df["poiId"] == int(list(row)[1]['poiId'])]
                dict["commentCount"] = len(comment_shop)
            else:
                dict["commentCount"] = 0
            if list(row)[1]['name'] is not np.nan:
                shop_info = list(row)[1]
                dict["name"] = shop_info["name"]
                dict["type"] = util.convert_shop_type(shop_info["type"])
                dict["recommended"] = eval(shop_info['recommended'])[0:3]
                dict["avgScore"] = shop_info["avgScore"]
                dict["address"] = shop_info["address"]
                dict["phone"] = "" if shop_info["phone"] is np.nan else shop_info["phone"]
                dict["openTime"] = "暂无营业时间" if shop_info["openTime"] is np.nan else shop_info["openTime"]
                dict["openTime_convert"] = util.convert_openTime(shop_info["openTime"])
                dict["avgPrice"] = shop_info["avgPrice"]
                dict["longitude"] = shop_info["longitude"]
                dict["latitude"] = shop_info["latitude"]

                dict["poiId"] = shop_info["poiId"]
                l.append(dict)
            # dict["phone"]
        # print(len(l))
    return json.dumps({"data":l[(count-1)*100:count*100]}, cls=util.NpEncoder)

def l1_data():# 词云
    groupby_type = shop_df03.groupby("type").count()   
    l = []# 存储店铺类别的列表
    name = list(groupby_type["name"].index)
    value = list(groupby_type["name"].values)

    for i,v in enumerate(name):
        l.append({"name":v,"value":value[i]})
    
   

    return json.dumps({"data":l}, cls=util.NpEncoder)

  
def l3_data(id):# 词云
    m = {}
    groupby_poid = comment_df.groupby("poiId")

    # img = io.BytesIO()
    # font = "Deng.ttf"
    for i,y in groupby_poid:
        if i in m:
            m[i]=m[i]+y["comment"]
        else: 
            m[i]=y["comment"]
    #  for key in m.keys():
    #     print(key)\
    img = io.BytesIO()
    txt = " ".join( [ str(t) for t in list(m[id]) if str(t)!="nan" ] )
    font = "Deng.ttf"
    alice = np.array(Image.open("./static/js/7.jpeg").resize((250,370)))
    w = wordcloud.WordCloud(background_color="white",width=250, height=370,mask=alice ,font_path=font)
    w.generate(txt)
    w.to_image().save(img,format="PNG")
    img.seek(0)
    print(img)
    return img


def l2_data():# 处理用户评论信息
    groupby_commentTime = comment_df.groupby("commentTime")['comment'].count()
    values_list = list(groupby_commentTime.values)
    values_list.insert(1,0)# 向2013年02月添加默认值0
    yAxis_2013 = values_list[0:12]
    yAxis_2014 = values_list[12:24]
    yAxis_2015 = values_list[24:36]
    yAxis_2016 = values_list[36:48]
    yAxis_2017 = values_list[48:60]
    yAxis_2018 = values_list[60:72]
    yAxis_2019 = values_list[72:84]
    d = {"yAxis_2013":yAxis_2013,"yAxis_2014":yAxis_2014,"yAxis_2015":yAxis_2015,"yAxis_2016":yAxis_2016,
         "yAxis_2017": yAxis_2017, "yAxis_2018": yAxis_2018, "yAxis_2019": yAxis_2019}
    return json.dumps(d, cls=util.NpEncoder)

def l2_data_2(type):
    dict = {
    "火锅":[('火锅', 91430), ('生日蛋糕', 4729), ('小吃快餐', 4061), ('烧烤烤串', 2943)],
    "生日蛋糕":[('生日蛋糕', 21448), ('火锅', 6447), ('小吃快餐', 1768), ('饮品店', 1351)],
    "小吃快餐":[('小吃快餐', 13052), ('火锅', 4814), ('饮品店', 1404), ('生日蛋糕', 1302)],
    "川湘菜":[('川湘菜', 6037),  ('火锅', 3989), ('生日蛋糕', 745), ('小吃快餐', 533)],
    "面包甜点":[('面包甜点', 10543), ('火锅', 4133), ('小吃快餐', 1111), ('生日蛋糕', 1061)],
    "北京菜":[('北京菜', 3143), ('火锅', 914), ('生日蛋糕', 270), ('烧烤烤串', 252)],
    "烧烤烤串":[('烧烤烤串', 9855),  ('火锅', 4927), ('生日蛋糕', 967), ('饮品店', 761)],
    "其他美食":[('其他美食', 1358), ('火锅', 547), ('生日蛋糕', 220), ('烧烤烤串', 84), ('小吃快餐', 62)],
    "西餐":[('西餐', 3862), ('火锅', 1825), ('生日蛋糕', 531), ('饮品店', 465)],
    "日本菜":[('日本菜', 4042), ('火锅', 1817), ('烧烤烤串', 491), ('生日蛋糕', 489)],
    "香锅烤鱼":[('香锅烤鱼', 6270),('火锅', 3531), ('生日蛋糕', 720), ('小吃快餐', 588)],
    "饮品店":[('饮品店', 9334), ('火锅', 3640), ('小吃快餐', 1572), ('生日蛋糕', 1274)],
    "创意菜":[('火锅', 401), ('创意菜', 382), ('烧烤烤串', 94), ('饮品店', 75)],
    "小龙虾":[('小龙虾', 898), ('火锅', 572), ('生日蛋糕', 189), ('小吃快餐', 185)],
    "东北菜":[('火锅', 118), ('东北菜', 57), ('小吃快餐', 31), ('生日蛋糕', 27)],
    "自助餐":[('火锅', 0), ('生日蛋糕', 0), ('小吃快餐', 0), ('川湘菜', 0), ('面包甜点', 0)],
    "食品保健":[('小吃快餐', 9), ('西餐', 4), ('食品保健', 3), ('火锅', 2)],
    "特色菜":[('特色菜', 1459),('火锅', 578), ('生日蛋糕', 145), ('烧烤烤串', 91)],
    "西北菜":[('西北菜', 1092), ('火锅', 651), ('烧烤烤串', 199), ('北京菜', 159)],
    "素食":[ ('素食', 83), ('火锅', 51), ('烧烤烤串', 11), ('饮品店', 8)],
    "中式烧烤/烤串":[('烧烤烤串', 9855),('火锅', 4927), ('生日蛋糕', 967), ('饮品店', 761)],
    "江河湖海鲜":[('江河湖海鲜', 328), ('火锅', 283), ('生日蛋糕', 50), ('烧烤烤串', 50)],
    "新疆菜":[('火锅', 129), ('新疆菜', 59), ('生日蛋糕', 45), ('饮品店', 25)],
    "日韩料理":[('日本菜', 4042), ('火锅', 1817), ('烧烤烤串', 491), ('生日蛋糕', 489)],
    "云贵菜":[('火锅', 244), ('云贵菜', 154), ('生日蛋糕', 70), ('饮品店', 60)]}
    listxy = dict.get(type)
    listx = []
    listy = []
    for i in listxy:
        listx.append(i[0])
        listy.append(i[1])
    listxy1 = [listx,listy]
    return json.dumps({"data":listxy1}, cls=util.NpEncoder)
     # # 找出所有类别是type的店铺id
    # type_shop = shop_df03[shop_df03["type"] == type]
    # id_list = list(type_shop["poiId"])
    # dict = {"01月":0,"02月":0,"03月":0,"04月":0,"05月":0,"06月":0,"07月":0,"08月":0,"09月":0,"10月":0,"11月":0,"12月":0,} # 存储月份评论数
    # # 根据id获取用户评论
    # list_userId=[]
    # for id in id_list:
    #     comment_shop = comment_df[comment_df["poiId"] == int(id)]
    #     for row in comment_shop["userId"].items():
    #         list_userId.append(row[1])
    # list_shop_key=[]
    # list_shop_key = l2_data_hash(list_userId)
    # print(list_shop_key)
    # return json.dumps({"data":list(dict.values())}, cls=util.NpEncoder)

def r2_data():
    # 返回店铺数据  店铺量  店铺评论量  种类量
    l = []
    l.append(len(comment_df))
    l.append(len(shop_df02))
    l.append(len(eval(l1_data())["data"]))
    

    # l.append(len(eval(l3_data())["data"]))


    return json.dumps({"data":l}, cls=util.NpEncoder)

def getShopCategoryNumByRegion(region):
    # 0 东北菜
    # 1 中式烧烤/烤串
    # 2 云贵菜
    # 3 其他美食
    # 4 创意菜
    # 5 北京菜
    # 6 小吃快餐
    # 7 小龙虾
    # 8 川湘菜
    # 9 新疆菜
    # 10 日本菜
    # 11 日韩料理
    # 12 江河湖海鲜
    # 13 火锅
    # 14 烧烤烤串
    # 15 特色菜
    # 16 生日蛋糕
    # 17 素食
    # 18 自助餐
    # 19 西北菜
    # 20 西餐
    # 21 面包甜点
    # 22 食品保健
    # 23 饮品店
    # 24 香锅烤鱼
    # shop_category = ['东北菜', '中式烧烤/烤串', '云贵菜', '其他美食', '创意菜', '北京菜', '小吃快餐', '小龙虾', '川湘菜', '新疆菜', '日本菜', '日韩料理', '江河湖海鲜', '火锅', '烧烤烤串', '特色菜', '生日蛋糕', '素食', '自助餐', '西北菜', '西餐', '面包甜点', '食品保健', '饮品店', '香锅烤鱼']
    shop_category = {}
    for row in shop_df03.iterrows():
        shop_info = list(row)[1]
        shop_type = shop_info["type"]
        s = "".join([str(j) for j in shop_info["address"][0:3]])
        if(region == "全市"):
            if shop_type in shop_category:
                shop_category[shop_type] += 1
            else:
                shop_category[shop_type] = 1
        elif (s == region):
            if shop_type in shop_category:
                shop_category[shop_type] += 1
            else:
                shop_category[shop_type] = 1
    dic_new = dict(zip(shop_category.values(), shop_category.keys()))
    result = []
    for i, j in dic_new.items():
        result.append({'value':i, 'name':j})
    return json.dumps({"data": result}, cls=util.NpEncoder)

# def l2_data_hash(listUserId):
#     dict = {"火锅":0,"生日蛋糕":0,"小吃快餐":0,"川湘菜":0,"面包甜点":0,"北京菜":0,"烧烤烤串":0,"其他美食":0,"西餐":0,
#     "日本菜":0,"香锅烤鱼":0,"饮品店":0,"创意菜":0,"小龙虾":0,"东北菜":0,"自助餐":0,"食品保健":0,"特色菜":0,"西北菜":0,"素食":0,
#     "中式烧烤/烤串":0,"江河湖海鲜":0,"新疆菜":0,"日韩料理":0,"云贵菜":0}
#     listUserId2 = []
#     for i in listUserId:
#         if((i not in listUserId2)&(i!=0)):
#             listUserId2.append(i)
#     listShop = []
#     for id in listUserId2:
#         comment_user = comment_df[comment_df["userId"] == int(id)]
#         poiId_list = list(comment_user["poiId"])
#         for poiId in poiId_list:
#             shop_type = poiId2type(poiId)
#             dict[shop_type]=dict[shop_type]+1
#     sorted_shop_type = sorted(dict.items(), key = lambda item:item[1],reverse=True)
#     # sorted_list_shop_key=[]
#     # for i in sorted_shop_type:
#     #     sorted_list_shop_key.append(i[0])
#     return sorted_shop_type[:5] 

# def poiId2type(poiId):
#     shop = shop_df03[shop_df03["poiId"] == str(poiId)]
#     shop_type = list(shop["type"])
#     if(len(shop_type)!=0):
#         return shop_type[0]
#     else:
#         return '其他美食'


def main():
    # d = center_data(1)
    # print(d)
    # print(comment_df)
    # print(shop_df02)
    # print(l2_data_2("火锅"))
    r2_data()
    # l3_data()

if __name__ == '__main__':
    main()
