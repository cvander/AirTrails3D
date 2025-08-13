const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 5050;

const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

// Simple route mappings for AirTrails3D project
const ROUTES = {
  '/john-doe': '/pages/john-doe.html',
  '/rosalia': '/pages/rosalia.html'
};

const server = http.createServer((req, res) => {
  console.log(`${req.method} ${req.url}`);

  let filePath = req.url;
  
  // Handle route mappings
  if (ROUTES[filePath]) {
    filePath = ROUTES[filePath];
  }

  // Serve files from public directory
  const publicPath = path.join(__dirname, 'public', filePath.startsWith('/') ? filePath.slice(1) : filePath);
  const extname = path.extname(publicPath).toLowerCase();
  const contentType = MIME_TYPES[extname] || 'application/octet-stream';

  fs.readFile(publicPath, (error, content) => {
    if (error) {
      if (error.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end(`
          <h1>404 - Page Not Found</h1>
          <p>Available routes:</p>
          <ul>
            <li><a href="/john-doe">John Doe's Routes</a></li>
            <li><a href="/rosalia">Rosalia's Routes</a></li>
          </ul>
        `, 'utf-8');
      } else {
        res.writeHead(500);
        res.end(`Server Error: ${error.code}`, 'utf-8');
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

server.listen(PORT, () => {
  console.log(`AirTrails3D server running at http://localhost:${PORT}/`);
  console.log('\nAvailable routes:');
  console.log(`  http://localhost:${PORT}/john-doe - John Doe's travel visualization`);
  console.log(`  http://localhost:${PORT}/rosalia - Rosalia's travel visualization`);
  console.log('\nPress Ctrl+C to stop the server');
});