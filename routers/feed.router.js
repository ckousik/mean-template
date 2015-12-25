var router = require('express').Router(),
	bodyParser = require('body-parser');

var eventDb = require('../database/event-db');

router.use(bodyParser.json());

router.post('/getfeed',function(req,res) {
	var data = {
		token:req.body.token
	}

	eventDb.getFeed(data,function(result) {
		res.json(result);
	});
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

router.post('/registeruser',function(req,res) {
	var data = {
		token: req.body.token,
		event_id: req.body.event_id
	}

	eventDb.registerUser(data,function(result) {
		res.json(result);er
	});
});

module.exports.router = router;