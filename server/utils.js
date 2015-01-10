var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 ,// Seconds.
  'Content-Type': "application/json"
};
var headers = defaultCorsHeaders;

exports.collectData = function(request, callback){
  var body = '';
  request.on('data', function(chunk) {
    body += chunk;
    if(body.length > 10000) {
      request.connection.destroy();
    }
  });

  request.on('end', function(){
    console.log(body);
    callback( JSON.parse(body) );
    console.log("on end");
  });
};

exports.sendResponse = function(response, message, statusCode){
  var code = statusCode || 200;
  response.writeHead(code, headers);
  response.end(message);
};