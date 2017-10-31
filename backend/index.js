const http = require('http');

const PORT=3001;

function handleRequest(request, response) {
  response.end('Dummy backend');
}

const server = http.createServer(handleRequest);

server.listen(PORT, function() {
  console.log("Server listening on: http://localhost:%s", PORT);
});