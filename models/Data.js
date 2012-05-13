var _ = require('underscore')._;
var Backbone = require('backbone');

module.exports = Backbone.Model.extend({
	defaults : {
		map : new Map()
	},
	
	initialize : function(args) {
		if (!args || !args.map || !args.players) {
			throw "AppModel InvalidConstructorArgs";
		}

		args.players.on('add', function(player) {
			var socket = player.get('socket');
			socket.send("Hello, Welcome to ElderMud!");
			socket.broadcast.send("Seomeone has just entered the game!");
		});

		args.players.on('remove', function(player) {
			args.io.sockets.send("Someone has just left the game...");
		});
	}
});