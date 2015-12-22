var router = require('express').Router(),
	bodyParser = require('body-parser');

var userDb = require('../database/user-db');

router.use(bodyParser.json());

router.route('/').get(function(req,res) {

}).post(function(req,res) {

});

router.route('/login').get(function(req,res) {

}).post(function(req,res) {
	var data = {
		username:req.body.username,
		pass:req.body.pass
	};
	userDb.login(data,function(result) {
		res.json(result);
	})

});

router.route('/register').get(function(req,res) {

}).post(function(req,res){
	var data = {
		username:req.body.username,
		pass:req.body.pass,
		email:req.body.email,
		displayName:req.body.email
	};

	userDb.register(data,function(result) {
		res.json(result);
	});
});

module.exports.router = router;