var express = require("express")
var app = express();
app.get("/",function(req,res){
	res.send("HELLO world");
})
app.listen(3000)