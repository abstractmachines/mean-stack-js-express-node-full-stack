'use strict'

// this app starts a server and listens on port 3000 for connections.
// The app responds with a hello world! for requests to the root URL or ROUTE.
// For every other path, it will respond with a 404, not found.

// run this app with the following commands:
// default: $ node app.js
// Other instances with named port(s): $ PORT=5000 node app.js

// these 2 lines create an express application:
var express = require( 'express' );

var app = express(); // express(): function exported by the express module.

// process in express returns the running process' (express') related properties
var process = require( 'process' ); // env variables from CLI

// parameterize the app + default fallback:
var port = ( process.env.PORT || 3000 );

// app.listen( port, function()
// {
// 	console.log('Example app is now listening on port' + port + ', sucka!');
// 	console.log( process.env.PORT );
//
// });

app.listen( port );

// HTTP METHODS: server.METHOD()
app.get('/', function( req, res )
{
	res.send('Hello World! Wesley Willis approved.');
});

// for logging request's body in cURL POST request:
// var bodyParser = require( 'body-parser' );
//
// app.use( bodyParser.text() );

// client/curl sends POST to /foo. Request includes string name in body.

// while app is running, send an HTTP POST request via command line:
//$ curl --request POST -v http://localhost:5000/foo
// curl --request POST -v -d name=brian http://localhost:5000/foo
app.post('/foo', function( req, res )
{
	res.send('This is a foo thing. Here is request.property stuff.\n');

	// console.log( req.body );

	// res.text( req.body );

	// console.log( req.name ); // one of these prints POST to console. sometimes.
	//
	// console.log( name ); // this has no effect .. OR DOES IT
});

// log the request body on the server side.
