const http = require('http'),
    fs = require('fs'),
    path = require('path'),
    url = require('url');

const server = http.createServer((req, res) => {
    
    const urlObj = new url.URL(req.url, 'http://localhost:8080');
    const resource = urlObj.pathname === '/' ? '/index.html' : urlObj.pathname;
    const resourcePath = path.join(__dirname, resource);

    //extracting querystring values
    const querystringObj = {}
    for (let [key, value] of urlObj.searchParams){
        querystringObj[key] = value
    };
    console.log(querystringObj);
    /////////

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