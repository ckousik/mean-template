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

module.exports.getFeed = function(data,callback) {
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
	
	Event.find({eventDate:{"$gte":new Date()}},function(err,events) {
		if(err){
			result.error = err;
			return callback(result);
		}
		result.success = true;
		result.events = events;
		return callback(result);
	});	
};

module.exports.registerUser = function(data,callback){
	var result = {
		success:false,
		error:null
	}

	var payload = jwtHandler.getPayload(data.token);
	if(payload == null){
		result.error = "Invalid token";
		return callback(result);
	}

	Event.findOne({_id:data.event_id},function(err,event) {
		if(err){
			result.error = err;
			return callback(result);
		}
		if(!event){
			result.error = "Event not found";
			return callback(result);
		}

		if(event.membersRegistered.indexOf(payload.id)>-1){
			result.error = "already registered";
			return callback(result);
		}
		event.membersRegistered.push(payload.id);
		event.save(function(err) {
			if(err){
				result.error = err;
				return callback(result);
			}
			result.success = true;
			return callback(result);
		});
	});
}