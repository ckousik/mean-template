var router = require('express').Router(),
	bodyParser = require('body-parser');

var userDb = require('../database/user-db');
var eventDb = require('../database/admin.event-db');

router.get('/',function(req,res) {
	res.sendFile('../views/admin.html');
});

router.post('/login',function(req,res) {
	var data = {
		username: req.body.username,
		password: req.body.password
	}

	userDb.loginAdmin(data,function(result) {
		res.json(result);
	})
});

router.post('/addevent',function(req,res) {
	var data = {
		token: req.body.token,
		title: req.body.title,
		description: req.body.description,
		date: req.body.date
	}

	eventDb.addEvent(data,function(result) {
		res.json(result);
	});
});

router.post('/getevents',function(req,res){
	var data = {
		token: req.body.token
	}

	eventDb.getEvents(data,function(result) {
		res.json(result);
	});
});

router.post('/deleteevent',function(req,res) {
	var data = {
		token: req.body.token,
		event_id:req.body.event_id
	}

	eventDb.deleteEvent(data,function(result) {
		res.json(result);
	});

});

module.exports.router = router;