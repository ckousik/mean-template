var Event = require('../models/event');
var jwtHandler = require('../database/jwthandler');

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
		event.registeredCount++;
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