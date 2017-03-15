var fs = require('fs');
var Canvas = require('canvas');
Canvas.registerFont('msjh.ttf',{family: '微軟正黑體'});
var fs = require('fs');
var request = require('request');
var dataUriToBuffer = require('data-uri-to-buffer');

var Canvas = require("canvas");
var Image = Canvas.Image;
var i=0;
eval(fs.readFileSync('MergeText.js')+" ");
eval(fs.readFileSync('MergeImage.js')+" ");
MergeImage.prototype.getblob=function(url,callback){
	i++;
	if(url.indexOf("data")==0){
		var img = new Image;
		img.src = dataUriToBuffer(url);
		callback && callback(img)
	}else{
		var path=__dirname + '/tmp'+i+'.png';
		request(url,function(path,error,response,body){
			fs.readFile(path,function(err, data){
				var img = new Image;
				img.src = data
				callback && callback(img)
				fs.unlinkSync(path);
			});
		}.bind(this,path)).pipe(fs.createWriteStream(path));	
	}
}


// var input_data=[
	// {x:0,y:0,w:100,h:100,source:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAU1QTFRFNjtAQEVK////bG9zSk9T/v7+/f39/f3+9vf3O0BETlJWNzxB/Pz8d3t+TFFVzM3O1NXX7u/vUldbRElNs7W3v8HCmZyeRkpPW19j8vLy7u7vvsDC9PT1cHR3Oj9Eo6WnxsjJR0tQOD1Bj5KVgYSHTVFWtri50dLUtLa4YmZqOT5D8vPzRUpOkZOWc3Z64uPjr7Gzuru95+jpX2NnaGxwPkNHp6mrioyPlZeadXh8Q0hNPEBFyszNh4qNc3d6eHx/OD1Cw8XGXGBkfoGEra+xxcbIgoaJu72/m52ggoWIZ2tu8/P0wcLE+vr7kZSXgIOGP0NIvr/BvL6/QUZKP0RJkpWYpKaoqKqtVVldmJqdl5qcZWhstbe5bHB0bnJ1UVVZwsTF5ubnT1RYcHN3oaSm3N3e3NzdQkdLnJ+h9fX1TlNX+Pj47/DwwsPFVFhcEpC44wAAAShJREFUeNq8k0VvxDAQhZOXDS52mRnKzLRlZmZm+v/HxmnUOlFaSz3su4xm/BkGzLn4P+XimOJZyw0FKufelfbfAe89dMmBBdUZ8G1eCJMba69Al+AABOOm/7j0DDGXtQP9bXjYN2tWGQfyA1Yg1kSu95x9GKHiIOBXLcAwUD1JJSBVfUbwGGi2AIvoneK4bCblSS8b0RwwRAPbCHx52kH60K1b9zQUjQKiULbMDbulEjGha/RQQFDE0/ezW8kR3C3kOJXmFcSyrcQR7FDAi55nuGABZkT5hqpk3xughDN7FOHHHd0LLU9qtV7r7uhsuRwt6pEJJFVLN4V5CT+SErpXt81DbHautkpBeHeaqNDRqUA0Uo5GkgXGyI3xDZ/q/wJMsb7/pwADAGqZHDyWkHd1AAAAAElFTkSuQmCC"},
	// {
		// x:10,y:10,w:100,h:100,rotate:45,
		// bg:{
			// padding:10,
			// radius:5,
			// color:"#ff0000",
		// },
		// source:"https://graph.facebook.com/PIXNETNBA/picture?width=300&height=300",
	// },
	// {x:300,y:300,w:100,h:100,source:"http://ipetair.com/wp-content/uploads/2014/09/479_%E7%8B%97%E7%8B%97%E7%9A%84%E8%BA%AB%E9%AB%94%E8%AA%9E%E8%A8%80%E4%BD%A0%E7%9F%A5%E5%A4%9A%E5%B0%91_1.jpg"},
	// {x:100,y:100,w:100,h:100,source:"http://static.mindcity.sina.com.tw/MC_data/focus/fate/008/images/area111/14159593911621.jpg"},
	// {x:200,y:200,w:200,h:100,source:"http://d36lyudx79hk0a.cloudfront.net/p0/mn/p2/c16531eda44144f6.jpg"},
	// {
		// x:20,y:20,w:400,h:400,rotate:0,
		// bg:{
			// padding:10,
			// radius:20,
			// color:"#fff000",
		// },
		// source:{
			// color:"rgba(0,0,255,1)",
			// bg:{
				// color:"#ff0000",
				// size:3,
			// },
			// w:400,
			// h:400,
			// size:100,
			// text:"how are you? 老王45 6465g fgdfgr tttg hgh fgh 安安安安 安安安安安",
			// type:0,
			// line:0,
			// align:{h:1,v:1},
			// family:"微軟正黑體",
			// continuous_text:[
				// {text:"how are you?",escape:true,},//color:"rgb(255,0,0)"
				// {text:"老王",escape:true},
				// {text:"[a-zA-z]+",escape:false},
			// ],
		// },
	// },
// ]
// console.log(JSON.stringify(input_data))
// return 
var input=__dirname+"/"+process.argv[2];
var input_data=JSON.parse(fs.readFileSync(input,'utf8'))

// console.log(input_data)
if(process.argv[3]){
	var output=process.argv[3]
}else{
	var output="image.png";
}
var out=fs.createWriteStream(__dirname+"/"+output);

(new MergeImage).merge(1200,630,input_data,function(canvas){
	var stream=canvas.createPNGStream();	
	stream.on('data', function(data){
		out.write(data)
	})
	stream.on('end', function(){
		console.log("save ok!!")
	});
});

 
