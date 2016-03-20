var Room = function(){
	this.params = {};
	this.users = [];
	
};

Room.prototype.addUser = function(user){
	console.log("added");
	this.users.push(user);
	console.log(this.users);
};

Room.prototype.removeUser = function(user){
	console.log("removed");
	var a = this.users;
	a.splice(a.indexOf(user), 1);
	console.log(this.users);
};

module.exports = new Room();