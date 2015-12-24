var jwt = require('jsonwebtoken');
var secret_key = 'secret';

function getPayload(token){
	try{
		var payload = jwt.verify(token,secret_key);
		return payload;
	}catch(error){
		return null;
	}
}

function signPayload(payload){
	return jwt.sign(payload,secret_key);
}

module.exports.getPayload = getPayload;
module.exports.signPayload = signPayload;