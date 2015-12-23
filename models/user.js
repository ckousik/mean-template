var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var hashGen = require('../helpers/hash');

var UserSchema = new Schema({
	displayName: String,
	email:{type:String , unique:true , required:true, dropDups:true},
	username:{type:String , index:{unique:true}, required:true, dropDups:true},
	pass:{type:String,required:true},
	salt:String,
	currentToken:{
		type:String,
		default:" "
	},
	created_at: {
		type:Date,
		required:true,
		default: Date.now,
	},
	registerEnabled:{
		type:Boolean,
		default:false
	}
});

UserSchema.pre('save',function(next) {
	if(this.registerEnabled == true){
		var hashSaltPair = hashGen.getHashed(this.pass);
		this.pass = hashSaltPair.hash;
		this.salt = hashSaltPair.salt;
		this.registerEnabled = false;
	}
	next();
});

UserSchema.method.comparePass = function(password,callback){
	if(this.pass == hashGen.digest(password+this.salt)){
		callback(true);
	}else{
		callback(false);
	}
}

module.exports = mongoose.model('User',UserSchema);