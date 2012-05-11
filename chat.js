var app = require('express').createServer();
var io = require('socket.io').listen(app);

require('jade');
app.set('view engine', 'jade');
app.set('view options', {
	layout : false
});

app.get('/*.(js|css)', function(req, res) {
	res.sendfile('./public' + req.url);
});

app.get('/', function(req, res) {
	res.render('chat');
});

var clients = {};

io.sockets.on('connection', function(client) {
	// Add client to list and give welcome
	clients[client.id] = client;
	client.send("Hello, Welcome to ElderMud!");
	client.broadcast.send("Someone has just entered the room, say hello!");

	client.on('disconnect', function() {
		delete clients[client.id];
		client.broadcast.send("Someone has just disconnected...");
	});
});

app.listen(8080);