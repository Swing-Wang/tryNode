var fs = require("fs"),
	request = require("request"),
	htmlparser = require('htmlparser'),
	configFilename = "./rss_feeds.txt";

function checkForRSSFile(){
	fs.exists(configFilename,function(exists){
		if(!exists)
			return next(new Error("Missing Rss file: " + configFilename));
		next(null,configFilename);
	});
}

function readRSSFile(configFilename){
	fs.readFile(configFilename,function(err,data){
		if(err) return next(err);

	data = data
			.toString()
			.replace(/^\s+|\s+$/g,"")
			.split("\n");
		//在data数组中随机找到一个数据
	var random = Math.floor(Math.random()*data.length);  //求最接近它的整数 小于等于
	next(null,data[random]);
	});
}

function downloadRSSFeed(feedURL){
	request({uri:feedURL},function(err,res,body){
		if(err)
			return next(err);
		if(res.statusCode != 200)
			return next(new Rrror("abnormal response status code"));
		next(null,body);
	});
}

function parseRSSFeed(rss){
	var handler = new htmlparser.RssHandler();
	var parser = new htmlparser.Parser(handler);
	parser.parseComplete(rss);
	console.log(handler.dom);
 		return next(Error("No RSS item found"));
	var item = hadnle.dom.items.shift();
	console.log(item.title);
	console.log(item.link);
}


var tasks = [checkForRSSFile,
			 readRSSFile,
			 downloadRSSFeed,
			 parseRSSFeed];

function next(err,result){
	if(err) throw err;
	var currentTask = tasks.shift();
	if(currentTask){
		currentTask(result);
	}
}

next();