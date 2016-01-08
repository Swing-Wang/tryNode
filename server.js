var http = require("http");
var fs = require("fs");
var path = require("path");
var mime = require("mime");
var chatServer = require("./lib/chat_server");
 
var cache = {};

function send404(response){
 
	response.writeHead(404,{'Content-Type':'text/plain'});
    response.write("Error:not found");
	response.end();
}

function sendFile(response,filePath,fileContents){
	response.writeHead(200,
		{'content-type':mime.lookup(path.basename(filePath))
	});
	response.end(fileContents);
}
function serveStatic(response,cache,absPath){

	if(cache[absPath]){   //if there is cache

		sendFile(response,absPath,cache[absPath]);
	}else{
		fs.readFile(absPath,function(err,data){
			if(err)
				{ 
				send404(response);  //404 Error
			}else{
				cache[absPath] = data;  // add to cache
				sendFile(response,absPath,data); //send 
			}
		});
	}
}

var server = http.createServer(function(request,response){
	var filePath ;
	if(request.url=="/"){
		filePath = "public/index.html";
	}else{
		filePath = 'public' + request.url;
	}
	var absPath = "./" + filePath;
	serveStatic(response,cache,absPath);
});

server.listen(3000,function(){
	console.log("server listenning on port 3000");
})

chatServer.listen(server);