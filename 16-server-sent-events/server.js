
const http = require('http');
const fs = require('fs'),
    path = require('path');

const server = http.createServer((req, res) => {
    if (req.url === '/'){
        fs.createReadStream(path.join(__dirname, 'index.html')).pipe(res);
        return;
    }
    if (req.url === '/stream'){
        res.writeHead(200, {
            'content-type' : 'text/event-stream',
            'connection' : 'keep-alive',
            'Access-Control-Allow-Origin' : '*'
        });
        setInterval(() => {
            res.write('event: message\n');
            res.write('data: ' + Date() + '\n\n')
        }, 3000);
    }
})

server.listen(9090)