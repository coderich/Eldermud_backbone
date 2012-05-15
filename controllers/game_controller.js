var _ = require('underscore')._;
var Backbone = require('backbone');
var realm = require('./data_controller').load();

// Every time a player is added
realm.get('players').on('add', function(player) {
	player.on('change:room', function() {
		module.exports.trigger('ioServerToSockets', {
			sockets : [ player.get('socket') ],
			msg : 'You moved...'
		});
	});

	module.exports.trigger('ioSocketToAll', {
		socket : player.get('socket'),
		msg : 'A new player has arrived!'
	});

	module.exports.trigger('ioServerToSockets', {
		sockets : [ player.get('socket') ],
		msg : player.get('room').toString()
	});
});

module.exports = {
	// IO Handling
	ioConnection : function(socket) {
		// Disconnect handler
		socket.on('disconnect', function() {
			module.exports.trigger('ioServerToAll', {
				msg : 'Someone has just disconnected...'
			});
		});

		// Message handler
		socket.on('message', function(msg) {
			module.exports.trigger('ioSocketToAll', {
				socket : this,
				msg : msg
			});
		});

		// TODO - Authenticate
		console.log(realm.get('map'));
		console.log(realm.get('map').get('rooms'));

		realm.get('players').add({
			room : realm.get('map').get('rooms').get(1),
			socket : socket
		});
	}
};

// Extend to be an event dispatcher
_.extend(module.exports, Backbone.Events);