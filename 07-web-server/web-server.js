const http = require('http'),
    fs = require('fs');

const server = http.createServer((req /* IncomingMessage */, res /* ServerResponse */) => {
    /* 
    res.write('<h1>Welcome to Node.js!<h1>')
    res.end(); 
    */

    //using sync
    
    /* const fileContents = fs.readFileSync('./index.html');
    res.write(fileContents);
    res.end();  */
   

    //async (using callbacks)
    /* 
    fs.readFile('./index.html', (err, fileContents) => {
        if (err){
            res.statusCode = 500;
            res.end();
            return;
        }
        res.write(fileContents);
        res.end();
    }); 
    */

    //async (using streams)
    /* 
    const stream = fs.createReadStream('./index.html')
    stream.on('data', chunk => res.write(chunk))
    stream.on('end', () => res.end())
    stream.on('error', () => {
        res.statusCode = 404;
        res.end();
    }); 
    */

    console.log(req.url)
    const stream = fs.createReadStream('./index.html')
    stream.pipe(res)
    stream.on('error', () => {
        res.statusCode = 404;
        res.end();
    }); 
});

server.listen(8080)

server.on('listening', () => {
    console.log('server listening on 8080');
});