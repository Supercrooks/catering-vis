from flask import Flask,send_file,render_template,json,request
import handler

app = Flask(__name__)


# def wordcloudgen(txt):
#     img = io.BytesIO()
# # 修改
#     background = Image.open("./static/7.jpeg")
#     background = background.resize((425,370))
#     graph = np.array(background);
# #修改
#     font = "Deng.ttf

#     wordcloud = WordCloud(font_path=font,width=370,height=425,background_color="white",mask=graph,colormap="hsv").generate(txt).to_image().save(img,format="PNG")
#     img.seek(0)
#     #print(img)
#     return img
@app.route('/')
def index():
    return render_template("index.html")

@app.route('/get_left1_data')
def get_left1_data():
    return handler.l1_data()

@app.route('/get_left2_data')
def get_left2_data():
    return handler.l2_data()

@app.route('/get_left3_data')
def get_left3_data():
    return send_file( handler.l3_data(4615402), mimetype='image/png', as_attachment=False )

@app.route('/get_left3_data_2')
def get_left3_data_2():
    id = request.args.get("id")
    print('**********************************')
    print(type(id))
    print(id)
    return send_file( handler.l3_data(int(id)), mimetype='image/png', as_attachment=False )


@app.route('/get_left2_data_2',methods=['POST'])
def get_left2_data_2():
    type = json.loads(list(request.form)[0])["type"]
    return handler.l2_data_2(type)

@app.route('/get_center_data',methods=['POST'])
def get_center_data():
    count = json.loads(list(request.form)[0])["count"]
    center_data = handler.center_data(count)
    return center_data

@app.route('/get_right2_data')
def get_right2_data():
    return handler.getShopCategoryNumByRegion("全市")

@app.route('/get_right2_data_by_type',methods=['POST'])
def get_right2_data_by_type():
    regionType = json.loads(list(request.form)[0])["regionType"]
    return handler.getShopCategoryNumByRegion(regionType)

if __name__ == '__main__':
    app.run(debug=True)


