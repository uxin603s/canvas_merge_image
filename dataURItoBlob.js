function dataURItoBlob(dataURI) {
	var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
	var byteString = atob(dataURI.split(',')[1]);
	var arrayBuffer = new ArrayBuffer(byteString.length);
		
	var dataView = new DataView(arrayBuffer);
	for (var i = 0; i < byteString.length; i++) {
		var value=byteString.charCodeAt(i);
		dataView.setUint8(i,value)
	}		
	var blob = new Blob([dataView],{type:mimeString});
	return blob;
}