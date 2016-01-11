var chat = function(socket){
	this.socket = socket;
};

chat.prototype.sendMessage = function(room,text){
	var messag = {
		room:room,
		text:text
	};
	var sendM = function(message){
            alert("message.text")
			var newElement = $("<div></div>").text(message.text);
		      alert(newElement)
			$('#messages').append(newElement);
		});

    		socket.on('message', sendM(messag));
	 sendM(messag);
 

};

chat.prototype.changeRoom = function(room,text){
	this.socket.emit('join',{
		newRoom:room
	})
};


chat.prototype.processCommand = function(commands){
	var words = commands.split(" ");
	var command = words[0].substring(1,words[0].length).toLowerCase();
	var message = false;
	switch(command){
		case "join":
			words.shift();
			var room = words.join(" ");
				this.changeRoom(room);
			break;
		case "nick":
			words.shift();
			var name = words.join(" ");
			this.socket.emit("nameAttempt",name);
			break;
		default:
			message = "Unrecognized command.";
			break;

	}
};