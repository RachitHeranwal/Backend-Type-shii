const http = require('http');
const fs = require("fs");
const path = require("path");
const { log } = require('console');

const port = 3000

const server = http.createServer((req,res) => {
  // to get absolute path of the current directory
  const filePath = path.join(__dirname, req.url ===  '/' ? "index.html" : req.url);
  console.log(filePath);
  
  const extName = String(path.extname(filePath)).toLowerCase();
  
  const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.png': 'image/png'
  }
  
  const contentType = mimeTypes[extName] || 'application/octet-stream';
  
  fs.readFile(filePath, (err, content) => {
    if(err){
      if(err.code === "ENOENT"){
        res.writeHead(404, {"Content-Type": 'text/html'})
        res.end('404: File Not Found Broooo')
      }
    }else {
      res.writeHead(200, {'content-Type': contentType});
      res.end(content);
    }
  })
  
});

server.listen(port, () => {
  console.log(`Server is listening on the port ${port}`);
});