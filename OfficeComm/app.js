/**
 * Module dependencies.
 */

var express = require('express'), routes = require('./routes'), tradditionalController = require('./controller/tradditionalController'), user = require('./routes/user'), http = require('http'), path = require('path');

var app = express();
// create application variable room
var room = require('./room');

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.set('room', room);

// development only
if ('development' === app.get('env')) {
	app.use(express.errorHandler());
}

// mapping url to controller
// app.get('/', routes.index);
// app.get('/users', user.list);
app.get('/users/check/:nickname', user.check);
app.get('/controller', tradditionalController.index);

var server = http.createServer(app);

var io = require('socket.io')(server);
io.app = app;

// console.log(io);

/*
 * event 1: add new user 
 * event 2: send message 
 * event 3: disconnected
 * 
 */
io.on('connection', function(socket) {
	console.log('a user connected');

	socket.on('main_channel', function(msg) {
		console.log('message: ' + msg);
		var room = socket.server.app.get('room');
		console.log(room);
		var msgObj = JSON.parse(msg);
		/*
		 * if (msgObj.event === 1) { room.addUser(msgObj.user); socket.nickname =
		 * msgObj.user; }
		 */
		switch (msgObj.event) {
		case 1:
			room.addUser(msgObj.user);
			socket.nickname = msgObj.user;
			
			break;
		case 2:
			console.log(msg);
			msgObj.user = socket.nickname;
			break;	
		default:
			break;
		}
		console.log(room);
		//send others same message
		io.emit('main_channel', JSON.stringify(msgObj));
	});

	socket.on('disconnect', function() {
		console.log('user disconnected');
		// console.log(socket.username);
		var room = socket.server.app.get('room');
		room.removeUser(socket.nickname);
		//send message to others
		io.emit('main_channel', JSON.stringify({
			'event' : 3,
			'user' : socket.nickname,
			'message' : 'The user has been left!'
		}));
	});
});

server.listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
});
