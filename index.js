var express = require('express'),
	app = express(),
	httpServer = require('http').createServer(app),
	port = process.env.PORT || 3000;

//Cross origin requests
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//static files in views
app.use(express.static(__dirname + '/views') );

//mount routers here
app.use('/',require('./routers/router').router);
app.use('/feed',require('./routers/feed.router').router);

httpServer.listen(port,console.log('listening on port : '+port));