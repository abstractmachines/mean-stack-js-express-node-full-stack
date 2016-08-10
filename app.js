'use strict'

// var express = require('express');

var express = require('express');

var app = express();

var pid = require('process');

app.get('/', function( req, res )
{
	res.send('Hello World! Wesley Willis approved.');
});

var port = 3000;

app.listen( port, function()
{
	console.log('Example app is now listening on port' + port + ', sucka!');
	console.log( pid.env );

});

// this app starts a server and listens on port 3000 for connections.
// The app responds with a hello world! for requests to the root URL or ROUTE.
// For every other path, it will respond with a 404, not found.


// run this app with the following command: $ node app.js
