const http = require('http');

// Create an HTTP server
const server = http.createServer((req, res) => {
  // Set the response header with a 200 OK status and text/plain content type
  res.writeHead(200, { 'Content-Type': 'text/plain' });

  // Send the "Hello, World!" message to the client
  res.end('Hello, World PORT-3003 !\n');
});

// Listen on port 3003
const port = 3003;
server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

