var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var EventSchema = new Schema({
	createdAt : {
		type:Date
		default: Date.now
	},

	eventDate : {
		type:Date
		default: Date.now 
	},

	title: {type: String, required: true},

	description: {type:String, required: true}
});