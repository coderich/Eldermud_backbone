var _ = require('underscore')._;
var Backbone = require('backbone');

module.exports = Backbone.Model.extend({
	toString : function() {
		var str = this.title + "\n" + this.descr + "\n" + "Obvious Exists: ";

		console.log(str);

		for ( var dir in this.exits) {
			switch (dir) {
			case 'n':
				str = str + 'north,';
				break;
			case 's':
				str += 'south,';
				break;
			case 'e':
				str = str + 'east,';
				break;
			case 'w':
				str = str + 'west,';
				break;
			case 'ne':
				str += 'northeast,';
				break;
			case 'nw':
				str += 'northwest,';
				break;
			case 'se':
				str += 'southeast,';
				break;
			case 'sw':
				str += 'southwest,';
				break;
			case 'u':
				str += 'up,';
				break;
			case 'd':
				str += 'down,';
				break;
			}
		}

		console.log(str);
		return str.trim(',');
	}
});