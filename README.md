# canvas_merge_image
待辦
	debug模式
	整理等待font載入程式
	拆function成檔案
	
文字參數
var font_object={
	text:"test123 go go",//合成文字
	w:100,//區塊大小
	h:100,//區塊大小
	size:100,//大小 小於等於20無法合圖
	color:"#FFFFFF",//顏色
	type:0,//0:多行自動縮小,1:水平單行,2垂直單行
	family:'微軟正黑體',//字體
	bg_size:5,//0-10描邊粗度
	bg_color:"#000000",//描邊顏色
	line:0,//0:無,1:底線,2:刪除線
	align:{
		h:0,//水平對齊0:左,1:中,2:右
		v:0,//垂直對齊0:上,1:中,2:下
	},
	continuous_text:[],//連續字集合不換行text:文字 es
}

canvas merge_text(font_object)
	文字合成圖片
	font_object 文字合成參數
	
canvas get_text_img(font_object,text)  
	合成文字圖
	font_object 文字合成參數
	text 合成單字
	
resize_text_imgs(&text_imgs,int scale)	
	縮放文字圖
	text_imgs 文字圖陣列
	scale 縮放大小 
	
int count_scale(text_imgs,w,h)
	計算最接近的縮放比例
	text_imgs 文字圖陣列
	w 寬
	h 高
	
merge_single_line_img(text_imgs)
	多個文字圖合成一張圖
	text_imgs 文字圖陣列
	
merge_continuous_text(text_imgs,continuous_text)
	保留文字圖合成一張圖
	text_imgs 文字圖陣列
	continuous_text 保留字
	
int count_break_scale(text_imgs,w,h,w_func,h_func)
	計算垂直 水平 單行縮放大小

int align_count(align,amount,inner_amount)
	計算垂直水平位置
	
check_repeat_range(range,texts_string,match_result,color);
	收集不重疊range
	
resize_img(img,scale)
	縮放圖片