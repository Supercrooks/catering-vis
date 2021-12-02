# -*- coding: utf-8 -*-
# @Time    : 2020/12/4 18:04
# @Author  : f
# @File    : utils.py

from typing import Text
import pandas as pd
import json
import util
import numpy as np

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
    w = wordcloud.WordCloud(background_color="white",width=270, height=430,font_path=font)
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
    # print(type)
    # 找出所有类别是type的店铺id
    type_shop = shop_df03[shop_df03["type"] == type]
    id_list = list(type_shop["poiId"])
    dict = {"01月":0,"02月":0,"03月":0,"04月":0,"05月":0,"06月":0,"07月":0,"08月":0,"09月":0,"10月":0,"11月":0,"12月":0,} # 存储月份评论数
    # 根据id获取用户评论
    for id in id_list:
        comment_shop = comment_df[comment_df["poiId"] == int(id)]
        for row in comment_shop["commentTime"].items():
            dict[row[1][5:]] = dict.get(row[1][5:],0) + 1
    return json.dumps({"data":list(dict.values())}, cls=util.NpEncoder)

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
