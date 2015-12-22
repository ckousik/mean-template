var mongoose = require('mongoose');
var db_url = "mongodb://ckousik-stories:!QctN1956!@ds033135.mongolab.com:33135/stories";
var hashGen = require('../helpers/hash');
var jwtHandler = require('./jwthandler');

mongoose.connect(db_url);

var User = require('../models/user');

module.exports.register = function (data,callback) {
	var result = {
		success:false,
		error:null
	}

	var newUser = new User({
		username:data.username,
		email:data.email,
		pass:data.pass,
		displayName:data.displayName
	});
	console.log('new user created');
	newUser.save(function(err){
		if(err){
			result.error = err;
			console.log(err);
		}else{
			result.success = true;
		}
		console.log('new user saved');
		callback(result);
	});

};

module.exports.login = function(data,callback) {
	var result = {
		success:false,
		error:null,
		token:null
	}

	User.findOne({username:data.username},function(err,user){
		if(err){
			result.error = err;
		}else if(user){
			console.log('user found: '+JSON.stringify(user));
			var hash = hashGen.digest(data.pass+user.salt);
			if(user.pass == hash){
				var payload = {
					id: user._id,
					iss: "mysite",
					permissions: ["read","post"]
				};
				user.currentToken = jwtHandler.signPayload(payload);
				result.token = user.currentToken;
				result.success = true;
			}
		}
		callback(result);
	});
};

module.exports.logout = function(data,callback) {
	var result = {
		success:false,
		error:null
	}

	var payload = jwtHandler.getPayload(data.token);
	if(payload==null){
		result.error = "Invalid token";
		callback(result);
	}else{
		User.findOne({_id:payload.id},function(err,user){
			if(err){
				result.error = err;
			}else if(user){
				user.currentToken = null;
				result.success = true;
			}
			callback(result);
		});
	}
};

module.exports.checkToken = function(data,callback) {
	var result = {
		success:false,
		error:null
	};

	if(data.id == null || data.token == null){
		result.error = "null value";
		callback(result);
		return;
	}

	User.findOne({_id:data.id},function(err,user) {
		if(err){
			result.error = err;
			callback(result);
		}else if(user){
			if(user.currentToken == data.token)
				result.success = true;
			callback(result);
		}
	});
};