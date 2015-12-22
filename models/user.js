var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var hashGen = require('../helpers/hash');

var UserSchema = new Schema({
	displayName: String,
	email:{type:String , unique:true , required:true, dropDups:true},
	username:{type:String , index:{unique:true}, required:true, dropDups:true},
	pass:{type:String,required:true},
	salt:String,
	created_at: {
		type:Date,
		required:true,
		default: Date.now
	},
	currentToken:{
		type:String
	}
})

UserSchema.pre('save',function(next) {
	var hashSaltPair = hashGen.getHashed(this.pass);
	this.pass = hashSaltPair.hash;
	this.salt = hashSaltPair.salt;
});

UserSchema.method.comparePass = function(password,callback){
	if(this.pass == hashGen.digest(password+this.salt)){
		callback(true);
	}else{
		callback(false);
	}
}

module.exports = mongoose.model('User',UserSchema);