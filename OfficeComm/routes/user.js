/*
 * GET users listing.
 */
var util = require('util');
var room = require('../room')

module.exports = {
	app:null,
	check: function(req, res) {
		var nickname = req.params.nickname;
		console.log(nickname);
		var app = req.app;
		console.log(app);
		res.send({
			content : {
				"exists" : true
			}
		});	
	}
};
/*exports.list = function(req, res) {
	res.send({
		content : {
			"text" : "Welcome to User Page"
		}
	});
};*/