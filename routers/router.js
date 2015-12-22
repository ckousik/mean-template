var router = require('express').Router(),
	bodyParser = require('body-parser');

var userDb = require('../database/user-db');

router.use(bodyParser.json());

router.get('/',function(req,res) {
	res.json({"Hello":"world !!"});
});

router.get('/login',function(req,res) {

});
router.post('/login',function(req,res) {
	var data = {
		username:req.body.username,
		pass:req.body.pass
	};
	userDb.login(data,function(result) {
		res.json(result);
	})

});

router.get('/register',function(req,res) {

});

router.post('/register',function(req,res){
	var data = {
		username:req.body.username,
		pass:req.body.pass,
		email:req.body.email,
		displayName:req.body.email
	};
	
	console.log('register request');
	userDb.register(data,function(result) {
		res.json(result);
	});
});

module.exports.router = router;