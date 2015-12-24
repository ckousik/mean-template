var router = require('express').Router(),
	bodyParser = require('body-parser');

var userDb = require('../database/user-db');

router.use(bodyParser.json());

router.get('/',function(req,res) {
	res.sendFile('../views/index.html');
});

router.get('/login',function(req,res) {

});
router.post('/login',function(req,res) {
	var data = {
		username:req.body.username,
		password:req.body.password
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
		password:req.body.password,
		email:req.body.email,
		displayName:req.body.displayName
	};

	console.log('register request');
	userDb.register(data,function(result) {
		res.json(result);
	});
});

router.post('/logout',function(req,res){
	var data = {
		"token":req.body.token
	}
	userDb.logout(data,function(result) {
		res.json(result);
	});
});

router.post('/checktoken',function(req,res) {
	var data = {
		token:req.body.token
	}
	userDb.checkToken(data,function(result) {
		res.json(result);
	});
});

module.exports.router = router;