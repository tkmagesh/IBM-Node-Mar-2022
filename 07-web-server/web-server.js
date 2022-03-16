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
    fs.readFile('./index.html', (err, fileContents) => {
        if (err){
            res.statusCode = 500;
            res.end();
            return;
        }
        res.write(fileContents);
        res.end();
    });

});

server.listen(8080)

server.on('listening', () => {
    console.log('server listening on 8080');
});