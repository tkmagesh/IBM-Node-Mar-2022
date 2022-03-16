const http = require('http'),
    dataParser = require('./data-parser'),
    serveStatic = require('./serve-static'),
    serveCalculator = require('./serve-calculator'),
    serve404 = require('./serve-404');

let middlewares = [ dataParser, serveStatic, serveCalculator, serve404 ];

function exec(req, res, middlewares){
    let first = middlewares[0],
        remaining = middlewares.slice(1),
        next = function(){
            exec(req, res, remaining);
        };
    if (typeof first === 'function'){
        first(req, res, next)
    }
}

const server = http.createServer((req, res) => {
    exec(req, res, middlewares);
});

server.listen(8080)

server.on('listening', () => {
    console.log('server listening on 8080');
});