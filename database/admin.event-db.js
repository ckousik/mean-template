var Event = require('../models/event');
var jwtHandler = require('../database/jwthandler');

module.exports.addEvent = function(data,callback) {
	var result = {
		success:false,
		error:null,
		id:null
	}
	var payload = jwtHandler.getPayload(data.token);
	if(payload == null){
		result.error = "Invalid token";
		return callback(result);
	}

	if(payload.admin == false){
		result.error = "Admin required";
		return callback(result);
	}

	var newEvent = new Event({
		title: data.title,
		description: data.description,
		eventDate: new Date(data.date)
	});

	newEvent.save(function(err) {
		if(err){
			result.error = err;
			return callback(result);
		}else{
			result.success = true;
			result.id = newEvent._id;
			return callback(result);
		}
	});

};

module.exports.getEvents = function(data,callback) {
	var result = {
		success:false,
		error:null,
		events:[]
	}
	var payload = jwtHandler.getPayload(data.token);
	if(payload == null){
		result.error = "Invalid token";
		return callback(result);
	}

	if(payload.admin == false){
		result.error = "Admin required";
		return callback(result);
	}

	Event.find({}).sort('-eventDate').exec(function(err,events) {
		if(err){
			result.error = err;
			return callback(result);
		}

		result.events = events;
		result.success = true;
		return callback(result);
	});
};

module.exports.deleteEvent = function(data,callback) {
	var result = {
		success:false,
		error:null
	}
	var payload = jwtHandler.getPayload(data.token);
	if(payload == null){
		result.error = "Invalid token";
		return callback(result);
	}

	if(payload.admin == false){
		result.error = "Admin required";
		return callback(result);
	}	

	Event.remove({_id:data.event_id},function(err,event) {
		if(err){
			result.error = err;
			return callback(result);
		}
		result.success = true;
		return callback(result);
	});
};