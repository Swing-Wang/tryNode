var http = require('http');
var fs = require("fs");
http.createServer(function(req,res){
	res.writeHead(200,{'Content-Type':"text/html"});
	res.write("hello world");
}).listen(3000);

console.log("Server running at http://localhost:3000");