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
var input=__dirname+"/"+process.argv[2];
var input_data=JSON.parse(fs.readFileSync(input,'utf8'))
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