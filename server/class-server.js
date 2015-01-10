var utils = require('./utils')

// save all methods in utils as exports.sendResponse, exports.collectData





curl -i http://127.0.0.1:3000/classes/chatterbox

var defaultCorsHeaders = {
	"Content-Type": "application/json"
}

var messages = [
{
objectId: 1
username:
text: ""
}
]
var objectIDCounter = 1;

handler = function(){
	switch(request.method){
	  case 'GET':
	  	break;
	  case 'POST':
	  	collectData(request, function(message){
	  		message.objectId = objectIdCounter;
	  		messages.push(message);
	  		sendResponse(response, {objectId: objectIdCounter}, 201); //parse returns 
	  	});
	  	break;
	}
}

var collectData = function(request, callback){
	var message = "";
	request.on('data', function(chunk){
		message += chunk;
	});
	request.on('end', function(){
		callback(JSON.parse(message));
	});
}


convert switch to object and call inside function

var action = actions[request.method];
if(action){
	action(request, response);
} else {
	
}


in basic-server.js
var url = require('url')

var routes = {
	'/classes/messages': messageHandler
}