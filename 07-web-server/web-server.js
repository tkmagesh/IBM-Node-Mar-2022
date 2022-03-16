const http = require('http'),
    fs = require('fs'),
    path = require('path');

const server = http.createServer((req, res) => {
    const resource = req.url === '/' ? '/index.html' : req.url;
    const resourcePath = path.join(__dirname, resource);
    if (!fs.existsSync(resourcePath)){
        res.statusCode = 404;
        res.end();
        return
    }
    const stream = fs.createReadStream(resourcePath)
    stream.pipe(res)
    stream.on('error', () => {
        res.statusCode = 500;
        res.end();
    }); 
});

server.listen(8080)

server.on('listening', () => {
    console.log('server listening on 8080');
});