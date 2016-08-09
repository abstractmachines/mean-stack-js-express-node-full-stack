'use strict'

var express = require('express');

var app = express();

app.get('/', function( req, res )
{
	res.send('Hello World! Wesley Willis approved.');
});

var x = 3001;

app.listen( x, function()
{
	console.log('Example app is now listening on port' + x + ', sucka!');
});

// this app starts a server and listens on port 3000 for connections.
// The app responds with a hello world! for requests to the root URL or ROUTE.
// For every other path, it will respond with a 404, not found.


// run this app with the following command: $ node app.js
