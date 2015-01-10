/* You should implement your request handler function in this file.
 * And hey! This is already getting passed to http.createServer()
 * in basic-server.js. But it won't work as is.
 * You'll have to figure out a way to export this function from
 * this file and include it in basic-server.js so that it actually works.
 * *Hint* Check out the node module documentation at http://nodejs.org/api/modules.html. */
// var fs = require('fs');
// var path = require('path');
var utils = require('./utils.js');

var messages = [{
  username: "Jono",
  objectId: 1,
  text: "Do my bidding!"
}];

var objectIdCounter = 1;

var exports = module.exports = {};
exports.handler = function(request, response) {
  /* the 'request' argument comes from nodes http module. It includes info about the
  request - such as what URL the browser is requesting. */

  /* Documentation for both request and response can be found at
   * http://nodemanual.org/0.8.14/nodejs_ref_guide/http.html */

  console.log("Serving request type " + request.method + " for url " + request.url );

  // var headers = defaultCorsHeaders;
  // headers['Content-Type'] = "application/json";

 
  // var messagesPath = "/classes/messages";
  // var roomPath = "/classes/room";
  // var roomPath1 = "/classes/room1";
  // var basePath = __dirname;
  // console.log('basePath: ', basePath);

  // if((request.url === messagesPath) || (request.url === roomPath) || (request.url === roomPath1))
  // {
    // var finalPath = basePath + request.url;
    // Process requests

  switch(request.method){
    case 'OPTIONS':
      console.log("Here1");
      utils.sendResponse(response, "", 204);
      break;
    case 'GET':
      console.log('GET', JSON.stringify({results: messages}));
      utils.sendResponse(response, JSON.stringify({results: messages}), 200);
      break;
    case 'POST':
      console.log('POST', JSON.stringify({objectId: objectIdCounter}));
      //response.writeHead(statusCode, headers);
      utils.collectData(request, function(message){
          console.log("Here3");
          message.objectId = ++objectIdCounter;
          messages.push(message);
          utils.sendResponse(response, JSON.stringify({objectId: objectIdCounter}), 201);
        });
        break;
    default:
      console.log("Here2");
      sendResponse(response, "", 404);
      break;
  }
   

    // if (request.method.toUpperCase() === 'OPTIONS'){
    //   statusCode = 204;
    //   response.writeHead(statusCode, 'No Content Found', headers);
    //   response.end();

    // } else {

    //   if(request.method === 'GET') {
    //   // Look at storage of chat messages,
    //     var statusCode = 200;

    //     response.writeHead(statusCode, headers);
    //     // var res = {};
    //     // res.results = resArray;
    //     response.end(JSON.stringify({results: resArray}));

    //   } else if (request.method === 'POST') {
    //     statusCode = 201;
    //     response.writeHead(statusCode, headers);
    //     // var body = '';
    //     // request.on('data', function(chunk) {
    //     //   body += chunk;
    //     //   if(body.length > 10000) {
    //     //     request.connection.destroy();
    //     //   }
    //     // });
    //     // request.on('end', function(){

    //     // });
    //      // resArray.push(JSON.parse(body));
    //     collectData(request, function(message){
    //       message.objectId = objectIdCounter;
    //       messages.push(message);
    //       sendResponse(response, {objectId: objectIdCounter}, 201);
    //     });
    //     response.end();
    //   } 
    // }

  // } else {
  //   statusCode = 404;
  //   response.writeHead(statusCode, headers);
  //   response.end();

  // }

  /* Make sure to always call response.end() - Node will not send
   * anything back to the client until you do. The string you pass to
   * response.end() will be the body of the response - i.e. what shows
   * up in the browser.*/


};

/* These headers will allow Cross-Origin Resource Sharing (CORS).
 * This CRUCIAL code allows this server to talk to websites that
 * are on different domains. (Your chat client is running from a url
 * like file://your/chat/client/index.html, which is considered a
 * different domain.) */


