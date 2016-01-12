var http = require('http');
var fs = require("fs");
http.createServer(function(req,res){
	if(req.url =="/"){
		handleHTML(res);
	} 
}).listen(8000);


function handleErr(err,res){
	console.log(err);
	res.end("server error");
}


function handleHTML(res){
	fs.readFile("./template.html",function(err,data){
		if(err){
			handleErr(err,res);
		}else{
			var html = data.toString();
			 addTitle(html,res);
		}
	})
}

function addTitle(html,res){
	var tem = fs.readFile("./titles.json",function(err,data){
		if(err){
			handleErr(err);
		}else{
			var titles = JSON.parse(data.toString()).join("</li><li>");
 			html = html.replace('%',titles);
 			res.writeHead("{content-type:'text/html'");
 			res.end(html);
				}
	})
}