/* 
server listens on port 8080
    if the request is for static resource (html, css, xml, json, js, png, jpg, gif, etc.)
        if the resource exists
            serve the resource
        else
            serve 404
    else if the request is for '/calculator'
        extract the data (based on the request method)
        calculate the result
        serve the result
    else
        serve 404 
*/

const http = require('http'),
    fs = require('fs'),
    path = require('path'),
    url = require('url'),
    calculator = require('./calculator');

const staticResourceExtns = ['.html', '.js', '.css', '.jpg', '.png', '.ico', '.xml', '.json'];

function isStatic(resource){
    const extn = path.extname(resource);
    return staticResourceExtns.indexOf(extn) >= 0;
}

const server = http.createServer((req, res) => {
    
    const urlObj = new url.URL(req.url, 'http://localhost:8080');
    const resource = urlObj.pathname === '/' ? '/index.html' : urlObj.pathname;
    if (isStatic(resource)){ 
        const resourcePath = path.join(__dirname, resource);

        //extracting querystring values
        const querystringObj = {}
        for (let [key, value] of urlObj.searchParams){
            querystringObj[key] = value
        };
    
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
    } else if (resource === '/calculator' && req.method === "GET"){
        //extracting querystring values
        const querystringObj = {}
        for (let [key, value] of urlObj.searchParams){
            querystringObj[key] = value
        };
        const op = querystringObj.op,
            n1 = parseInt(querystringObj.n1),
            n2 = parseInt(querystringObj.n2);
        if (!calculator.hasOwnProperty(op)){
            res.statusCode = 400;
            res.end()
            return
        }
        const result = calculator[op](n1, n2)
        res.write(result.toString());
        res.end();
    } else if (resource === '/calculator' && req.method === "POST"){
        //extracting data from the request body & parse them
        let rawData = '';
        req.on('data', chunk => {
            rawData += chunk;
        });
        req.on('end', ()=> {
            var searchParms = new url.URLSearchParams(rawData)
            const formDataObj = {}
            for (let [key, value] of searchParms){
                formDataObj[key] = value
            };
            const op = formDataObj.op,
                n1 = parseInt(formDataObj.n1),
                n2 = parseInt(formDataObj.n2);
            if (!calculator.hasOwnProperty(op)){
                res.statusCode = 400;
                res.end()
                return
            }
            const result = calculator[op](n1, n2)
            res.write(result.toString());
            res.end();
        })
    } else {
        res.statusCode = 404;
        res.end();
    }
});

server.listen(8080)

server.on('listening', () => {
    console.log('server listening on 8080');
});