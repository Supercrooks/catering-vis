# -*- coding: utf-8 -*-
# @Time    : 2020/12/28 11:37
# @Author  : f
# @File    : spider.py

import requests
import pandas as pd
import re
import csv
import json
import util
import time
'''
根据店铺id获取特色美食（名称、图片地址）、店铺分类

并保存到csv文件中
'''
comment_data_path = ".\static\data\shop_comments.csv"
shop_data_path = ".\static\data\shop_details.csv"

comment_df = pd.read_csv(comment_data_path)
shop_df = pd.read_csv(shop_data_path)

# 获取店铺的id列表
def get_id():
    return list(shop_df['poiId'])

def get_detail_byId(id):
    '''
    :param list_id: 店铺id
    :return: 店铺信息
    '''
    base_url = "https://my.meituan.com/meishi/"
    open_url = base_url+str(id)
    headers = {
        'Accept': '*/*',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'zh-CN,zh;q=0.9',
        'Connection': 'keep-alive',
        'Host': 'my.meituan.com',
        'Referer': 'https://gz.meituan.com/meishi/',
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36',
        "Cookie":"_lxsdk_cuid=176a76e5465c8-08c7fda338591a-366b4108-144000-176a76e5466c8; _hc.v=47584a75-cd95-5d49-4774-f90292228934.1609128422; iuuid=DE08D7129F1C9300F442BD3F534FE1E9BEB5960DC89FC964B06DE75D92AF59FF; _lxsdk=DE08D7129F1C9300F442BD3F534FE1E9BEB5960DC89FC964B06DE75D92AF59FF; webp=1; __utma=74597006.1600449216.1609384800.1609384800.1609384800.1; __utmz=74597006.1609384800.1.1.utmcsr=link.csdn.net|utmccn=(referral)|utmcmd=referral|utmcct=/; ci=306; cityname=%E7%BB%B5%E9%98%B3; latlng=31.540156,104.689433,1609384831294; i_extend=C019032296837928515275757042931456002187_c14_e76093ef0e7669cc9c26a543f38b45487GimthomepageguessH__a; lsu=; __mta=221682599.1609128395200.1609636290109.1609637806937.14; client-id=aff308ba-8320-4796-8a4c-1303c58c5136; uuid=099f6650-8b35-423a-a6ea-3d226bb37422; _lx_utm=utm_source%3Dlink.csdn.net%26utm_medium%3Dreferral%26utm_content%3D%252F; lat=31.504214; lng=104.784832; _lxsdk_s=176ccfd3748-f1a-79a-0bb%7C%7C2"
    }
    res = requests.get(open_url,headers=headers)
    res.encoding = "utf-8"
    l = [id]  # 存储店铺信息的列表
    pattern = "<script>window._appState = (.*?);</script>"
    rec = re.compile(pattern)  # 预编译
    if rec.search(res.text):
        json_str = rec.search(res.text).groups()
        for j in json_str:
            d = json.loads(j)
            l.append(d['detailInfo']['name'])
            l.append(d['crumbNav'])
            l.append(d['recommended'])
            l.append(d['detailInfo']['avgScore'])
            l.append(d['detailInfo']['address'])
            l.append(d['detailInfo']['phone'])
            l.append(d['detailInfo']['openTime'])
            l.append(d['detailInfo']['avgPrice'])
            result = util.wgs84tobd09(d['detailInfo']['longitude'], d['detailInfo']['latitude'])
            l.append(result[0]['x'])
            l.append(result[0]['y'])
    return l

#保存店铺信息
def save_info(id_list):
    '''
    :param id_list: 店铺id列表
    :return:
    '''
    with open("static/data/shop_details02.csv", "a+", encoding="utf-8", newline="") as f:
        # 2. 基于文件对象构建 csv写入对象
        csv_writer = csv.writer(f)
        # 3. 构建列表头
        # csv_writer.writerow(["poiId", "name", "type","recommended","avgScore","address","phone","openTime","avgPrice","longitude","latitude"],newline="")
        # 4. 写入csv文件内容
        for id in id_list:
            info_list = get_detail_byId(id)
            print(info_list)
            csv_writer.writerow(info_list)
# 清除csv文件中的空行
def clearBlankLine():
    file1 = open('static/data/shop_details02.csv', 'r', encoding='utf-8') # 要去掉空行的文件
    file2 = open('../static/data/shop_details03.csv', 'w', encoding='utf-8') # 生成没有空行的文件
    try:
        for line in file1.readlines():
            if line == '\n':
                line = line.strip("\n")
            file2.write(line)
    finally:
        file1.close()
        file2.close()


def main():
    print("------{} 开始爬取数据------".format(time.strftime('%Y-%m-%d %H:%M:%S',time.localtime(time.time()))))
    id_list = get_id()
    save_info(id_list)
    print("------{} 爬取数据结束------".format(time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(time.time()))))

if __name__ == '__main__':
    main()