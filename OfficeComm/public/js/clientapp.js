//create new object class
/*Messenger will responsible to send and receive message*/
function Messenger(socket, user, resolver) {
	this.socket = socket;
	this.user = user;
	//this.msgs = [];
	//this.resolver = res;
	socket.on('main_channel', function(msg) {
		// $('#messages').append($('<li>').text(msg));
		console.log("I got it : " + msg);
		//this.msgs.push(msg);
		// what to do with message received
		resolver.resolve(msg);
	});
}

Messenger.prototype.send = function(message) {
	console.log("Message sent");
	var json = JSON.stringify({
		"event": 2,
		"user" : this.user,
		"message" : message
	});
	this.socket.emit('main_channel', json);
};

Messenger.prototype.register = function() {
	var json = JSON.stringify({
		"event": 1,
		"user" : this.user
	});
	this.socket.emit('main_channel', json);
};
