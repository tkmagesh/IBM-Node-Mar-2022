const http = require('http'),
    dataParser = require('./data-parser'),
    serveStatic = require('./serve-static'),
    serve404 = require('./serve-404'),
    serveCalculator = require('./serve-calculator');

const server = http.createServer((req, res) => {
    console.log(`${req.method} - ${req.url}`)
    dataParser(req, res)
    serveStatic(req, res)
    serveCalculator(req, res)
    serve404(res);
});

server.listen(8080)

server.on('listening', () => {
    console.log('server listening on 8080');
});