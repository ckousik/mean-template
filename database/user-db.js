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
		password:data.password,
		displayName:data.displayName
	});

	newUser.password = newUser.generateHash(data.password);
	//console.log('new user created');
	newUser.save(function(err){
		if(err){
			result.error = err;
			console.log(err);
		}else{
			result.success = true;
		}
		//console.log('new user saved');
		return callback(result);
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
			return callback(result);
		}

		if(!user){
			result.error = "User not found";
			return callback(result);
		}

		if(user){
			if(user.comparePassword(data.password)){
				var payload = {
					id: user._id,
					iss: "mysite",
					permissions: ["read","post"]
				};
				result.token = jwtHandler.signPayload(payload);
				result.success = true;
				user.currentToken = result.token;
				user.save();
			}
		}
		return callback(result);
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
		error:null,
		token:null
	};

	if(data.token == null){
		result.error = "null value";
		callback(result);
		return;
	}
	var payload = jwtHandler.getPayload(data.token);
	if(payload==null){
		result.error = "Invalid token";
		callback(result);
		return;
	}
	User.findOne({_id:payload.id},function(err,user) {
		if(err){
			result.error = err;
			callback(result);
			return;
		}else if(user){
			/*
			console.log(JSON.stringify(user));
			console.log("incoming token : "+data.token);
			console.log("user token : "+user.currentToken);
			*/
			if(user.currentToken == data.token){
				result.success = true;
				result.token = user.currentToken;
			}else{
				result.error = "Token mismatch";
			}
			callback(result);
			return;
		}
	});
};