/* 
    server should listen on 9090
    request => http://localhost:9090/calculator?op=add&n1=100&n2=200
        response => 300
    if the request is not for '/calculator'
        then send 404
*/

const http = require('http'),
    url = require('url'),
    calculator = require('./calculator');

const server = http.createServer((req, res) => {
    const urlObj = new url.URL(req.url, 'http://localhost:8080');

    if (urlObj.pathname === '/calculator'){
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
    } else {
        res.statusCode = 404;
        res.end();
    }
});

server.listen(9090);

server.on('listening', () => {
    console.log('app-server listening on 9090')
})