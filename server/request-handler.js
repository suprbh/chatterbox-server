/* You should implement your request handler function in this file.
 * And hey! This is already getting passed to http.createServer()
 * in basic-server.js. But it won't work as is.
 * You'll have to figure out a way to export this function from
 * this file and include it in basic-server.js so that it actually works.
 * *Hint* Check out the node module documentation at http://nodejs.org/api/modules.html. */
var resArray = [];
var roomArray = [];
var exports = module.exports = {};

var processMessageRequest = function(request, response, headers){
  if(request.method === 'GET') {
      // Look at storage of chat messages,
      var statusCode = 200;
      response.writeHead(statusCode, headers);
      var res = {};
      res.results = resArray;
      response.write(JSON.stringify({results: resArray}));
      response.end();

    } else if (request.method === 'POST') {
      statusCode = 201;
      response.writeHead(statusCode, headers);
      var body = '';
      request.on('data', function(chunk) {
        body += chunk;
        if(body.length > 10000) {
          request.connection.destroy();
        }
         // console.log('req body: ', JSON.parse(body));
         resArray.push(JSON.parse(body));
      });
      response.end();

    } else if (request.method === 'PUT') {



    } else if (request.method === 'DELETE') {

  }
};

var processRoomRequest = function(request, response, headers){
  console.log("Here 1");
  if(request.method === 'GET') {
    // Look at storage of chat messages,
    var statusCode = 200;
    console.log("Here 2");
    response.writeHead(statusCode, headers);
    var res = {};
    res.results = roomArray;
    response.write(JSON.stringify({results: roomArray}));
    response.end();

  } else if (request.method === 'POST') {
    statusCode = 201;
    response.writeHead(statusCode, headers);
    var body = '';
    request.on('data', function(chunk) {
      body += chunk;
      if(body.length > 10000) {
        request.connection.destroy();
      }
       roomArray.push(JSON.parse(body));
    });
    response.end();

  } else if (request.method === 'PUT') {

  } else if (request.method === 'DELETE') {

  }

};

exports.handleRequest = function(request, response) {
  /* the 'request' argument comes from nodes http module. It includes info about the
  request - such as what URL the browser is requesting. */

  /* Documentation for both request and response can be found at
   * http://nodemanual.org/0.8.14/nodejs_ref_guide/http.html */

  console.log("Serving request type " + request.method + " for url " + request.url );

  /* Without this line, this server wouldn't work. See the note
   * below about CORS. */
  var headers = defaultCorsHeaders;

  headers['Content-Type'] = "text/plain";

  /* .writeHead() tells our server what HTTP status code to send back */

  // var parseURL = request.url.split('/'); // Gives array of paths
  var messagesPath = "/classes/messages";
  var roomPath = "/classes/room";
  var roomPath1 = "/classes/room1";

  console.log(request.url+ ":" + messagesPath +":"+ roomPath);
  if(request.url === messagesPath)
  {
    // Process requests
    console.log("Here 3");
    processMessageRequest(request, response, headers);

  } else if ((request.url === roomPath) || (request.url === roomPath1)){
    console.log("Here 4");
    processRoomRequest(request, response, headers);

  } else {
    statusCode = 404;
    response.writeHead(statusCode, headers);
    response.end();

  }

  /* Make sure to always call response.end() - Node will not send
   * anything back to the client until you do. The string you pass to
   * response.end() will be the body of the response - i.e. what shows
   * up in the browser.*/

  // response.end();
};

/* These headers will allow Cross-Origin Resource Sharing (CORS).
 * This CRUCIAL code allows this server to talk to websites that
 * are on different domains. (Your chat client is running from a url
 * like file://your/chat/client/index.html, which is considered a
 * different domain.) */
var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};
