'use strict'

// this app starts a server and listens on port 3000 for connections.
// The app responds with a hello world! for requests to the root URL or ROUTE.
// For every other path, it will respond with a 404, not found.


// run this app with the following commands:
// default: $ node app.js
// Other instances with named port(s): $ PORT=5000 node app.js

var express = require('express');

var app = express();

var process = require('process');

app.get('/', function( req, res )
{
	res.send('Hello World! Wesley Willis approved.');
});

app.post('/foo', function( req, res )
{
	res.send('THis is a foo thing.');
	console.log( req.name );
});

// send an HTTP POST request via command line:
//$ curl --request POST -v http://localhost:5000/foo
// curl --request POST -v -d "name=brian" http://localhost:5000/foo


var port = ( process.env.PORT || 3000 );

// app.listen( port, function()
// {
// 	console.log('Example app is now listening on port' + port + ', sucka!');
// 	console.log( process.env.PORT );
//
// });

app.listen( port );
