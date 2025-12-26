const http = require('http');
const fs = require("fs");
const path = require("path");
const port = 3000

const server = http.createServer((req,res) => {
  const filePath = path.join(__dirname, req.url === '/' ? "index.html" : req.url);
  console.log(filePath);
  
  const extName = String(path.extname(filePath).toLowerCase());
  
  const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
  }
  
  const conetentType = mimeTypes[extName] || 'application/octet-stream';
  
  fs.readFile(filePath, (err,content) => {
    if (err) {
      if (err.code === "ENOENT") {
        res.writeHead(404, { "Conetent-Type": "text/html" }),
          res.end('404, File not found')
      }
    } else {
      res.writeHead(200, {"content-Type":"contentType"})
      res.end(content)
    }
  })
})

server.listen(port, () => {
  console.log(`Server is listening on the port ${port}`);
})