var socketio = require("socket.io");
var io;
var guestNumber = 1;
var nickNames = {};
var nameUsed = [];
var currentRoom = {};

exports.listen = function(server){
	// 启动socket.io服务器，允许它搭载在已有的HTTP服务器上
	io = socketio.listen(server);
	io.set('log level',1);
// 定义每个用户连接的处理逻辑
	io.sockets.on("connection",function (socket){
 //    用户连接时，赋予一个访客名
		guestNumber = assignGuestName(sockit,guestNumber,nickNames,namesUsed);
		// 用户连接时，放在Lobby聊天室
		joinRoom(socket,"Lobby");
		// 处理用户的消息、更名，以及聊天室的创建和变更
		handleMessageBroadcasting(socket,nickNames);
		handleNameChangeAttempts(socket,nickNames,namesUsed);
		handleRoomJoining(socket);
// 用户发出请求时，向其提供已经被占用的聊天室的列表
		socket.on('rooms',function(){
			socket.emit("rooms",io.sockets.manager.rooms);
		});
// 定义用户断开连接后的清除逻辑
		handleClientDisconnection(socket,nickNames,namesUsed);
	});

};

function assignGuestName(socket,guestNumber,nickNames,namesUsed){
	var name = "Guest" + guestNumber;
	nickNames[socket.id] = name;
	socket.emit('nameResult',{
		success:true,
		name:name
	});
	namesUsed.push(name); //已经被占用的昵称
	return questNumber +1;
}