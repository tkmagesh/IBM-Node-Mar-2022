const http = require('http'),
    path = require('path'),
    dataParser = require('./data-parser'),
    serveStaticFactory = require('./serve-static'),
    serveCalculator = require('./serve-calculator'),
    serve404 = require('./serve-404'),
    app = require('./app')

app.use(dataParser)
app.use(serveStaticFactory(path.join(__dirname, 'public')))
app.use(serveCalculator)
app.use(serve404)

const server = http.createServer((req, res) => {
    app(req, res)
});

server.listen(8080)

server.on('listening', () => {
    console.log('server listening on 8080');
});