/* Import node's http module: */
var http = require("http");
var url = require('url');
var utils = require('./utils.js')

var handler = require('./request-handler.js');


/* Every server needs to listen on a port with a unique number. The
 * standard port for HTTP servers is port 80, but that port is
 * normally already claimed by another server and/or not accessible
 * so we'll use a higher port number that is not likely to be taken: */
var port = 3000;

/* For now, since you're running this server on your local machine,
 * we'll have it listen on the IP address 127.0.0.1, which is a
 * special address that always refers to localhost. */
var ip = "127.0.0.1";

var routes = {
  "/classes/messages": handler.handler,
  "/classes/room" : handler.handler
};

var server = http.createServer(function(request, response){
  var path = url.parse(request.url);
  var route = routes[path.pathname];
  if (route){
    route(request, response);
  } else {
    utils.sendResponse(response, null, 404);
  }
});

console.log("Listening on http://" + ip + ":" + port);
server.listen(port, ip);
/* We use node's http module to create a server. Note, we called it 'server', but
we could have called it anything (myServer, blahblah, etc.). The function we pass it (handleRequest)
will, unsurprisingly, handle all incoming requests. (ps: 'handleRequest' is in the 'request-handler' file).
Lastly, we tell the server we made to listen on the given port and IP. */


/* To start this server, run:
     node basic-server.js
 *  on the command line.

 * To connect to the server, load http://127.0.0.1:3000 in your web
 * browser.

 * server.listen() will continue running as long as there is the
 * possibility of serving more requests. To stop your server, hit
 * Ctrl-C on the command line. */
