const http = require('http'),
    path = require('path'),
    logger = require('./logger'),
    dataParser = require('./data-parser'),
    serveStaticFactory = require('./serve-static'),
    serveCalculator = require('./serve-calculator'),
    serve404 = require('./serve-404'),
    app = require('./app')

app.use(logger);
app.use(dataParser)
app.use(serveStaticFactory(path.join(__dirname, 'public')))
app.use(serveCalculator)
app.use(serve404)

const server = http.createServer(app);

server.listen(8080)

server.on('listening', () => {
    console.log('server listening on 8080');
});