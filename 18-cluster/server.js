const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;



if (cluster.isPrimary) {
  // Fork workers.
  console.log("# of cpus -> ", numCPUs);
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', function(worker, code, signal) {
    console.log('worker ' + worker.process.pid + ' died');
  });
} else {
  // Workers can share any TCP connection
  // In this case it is an HTTP server
  console.log('worker ' + process.pid + ' process created');  
  http.createServer(function(req, res) {
    console.log('worker ' + process.pid + ' processed the request');  
    res.writeHead(200);
    res.end("hello world\n");
  }).listen(8000);
}
