/**
程序读取titles.json文件，并将其内容作为副标题

*/
var http = require('http');
var fs = require("fs");

http.createServer(function(req,res){
	if(req.url == "/"){
		 fs.readFile('./titles.json', function(err,data){
			if(err){
				console.log(err);
				res.end("server Error");
			}else{
				var titles = JSON.parse(data.toString());
				fs.readFile('./template.html',function(err,data){
					if(err){
						console.log(err);
						res.end("server error");
					} else {
						var tem = data.toString();
						var html = tem.replace("%",titles.join("</li><li>"));
						res.writeHead("{Content-Type:'text/html'");
						res.end(html);
					}
				})
			}
		});
	}
}).listen(8000,"127.0.0.1")