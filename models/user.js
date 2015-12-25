var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var bcrypt = require('bcrypt-nodejs');

var UserSchema = new Schema({
	displayName: String,
	email:{type:String , unique:true , required:true, dropDups:true},
	username:{type:String , index:{unique:true}, required:true, dropDups:true},
	password:{type:String,required:true},
	currentToken:{
		type:String,
		default:" "
	},
	created_at: {
		type:Date,
		required:true,
		default: Date.now,
	},
	admin:{
		type:Boolean,
		default:false
	}
});

UserSchema.methods.generateHash = function(password) {
	return bcrypt.hashSync(password,bcrypt.genSaltSync(10),null);
};

UserSchema.methods.comparePassword = function(password) {
	return bcrypt.compareSync(password,this.password);
};

module.exports = mongoose.model('User',UserSchema);