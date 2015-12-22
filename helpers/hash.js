var crypto = require('crypto');
var algo = 'sha512';

function digest(message){
	return crypto.createHash(algo).update(message).digest("hex");
}

function getHashed(password){
		var salt = crypto.randomBytes(64).toString('base64');
		var hash = digest(password+salt);
		return {"hash":hash,"salt":salt}; 	
}

//console.log(JSON.stringify(getHashed('chinmay')));
module.exports.digest = digest;
module.exports.getHashed = getHashed;