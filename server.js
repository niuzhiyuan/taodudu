var express = require("express");

var app = express();
app.use(express.static("www"))













app.listen(8080,function(){
	console.log("服务器开启")
})
