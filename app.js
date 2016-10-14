'use strict'

// this app starts a server and listens on port for connections.
// The app responds with a hello world! for requests to the root URL or ROUTE.
// For every other path, it will respond with a 404, not found.

/* The above applies unless clustering is done, by running app with PORT
 * env variable specified for clustering and future load balancing.
 *
 * A load balancer essentially sits in front of clustered server instances,
 * and sends incoming requests to different instances, almost like a
 * multiplexer. This helps incoming requests not to overwhelm a single
 * instance of this Node application sitting on the server.
 *
 * For clustering, run app like this:
 *
 * Instance #0:
 * $ node app.js 		// Terminal 1, app instance #0. Default port 3000.
 * // at localhost:3000, you can see res.send from the GET handler below.
 *
 * Instance #1:
 * $ PORT=3100 node app.js  // Terminal 2, app instance #1. Port 3100.
 * // at localhost:3100, you can see res.send from the GET handler below.
 */

 /* While app is running in Terminals 1 and/or 2, Open Terminal 3, and
  * send an HTTP POST request via command line, change the Content-Type
	* header to plain text, and verify the output by echoing the
	* -d data=variable in the server response (the POST handler below):
  *
	* $ curl -X POST -d name=radsauce http://localhost:3100/foo
  * -H "Content-Type: text/plain"
  *
  * The above changes existing Content-Type HTTP header to send a MIME type /
  * data type message of plain text. (Default is urlencoded).
  */

// these 2 lines create an express application:
var express = require( 'express' );

var app = express(); // express(): function exported by the express module.

// process in express returns the running process' (express') related properties
var process = require( 'process' ); // env variables from CLI

// parameterize the app + default fallback of port 3000 with node app.js above:
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
	res.send('Hello World! Wesley Willis approved.'); // browser prints
});

// for logging request's body in cURL POST request:
var bodyParser = require( 'body-parser' );
//
app.use( bodyParser.text() );

app.post('/foo', function( req, res )
{
	// log the request body on the server side:
	res.send( req.body ); // verify receipt: server response writes out text.

	console.log( req.body );

});
