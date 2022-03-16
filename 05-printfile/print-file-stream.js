const fs = require('fs')

const stream = fs.createReadStream('sample.txt', { encoding : 'utf8', highWaterMark : 512});

//stream events => open, data, end, close, error etc
/* 
let readCount = 0;

stream.on('open', () => {
    console.log('Beginning of file')
});

stream.on('end', () => {
    console.log('End of file')
    console.log('readCount = ', readCount)
});

stream.on('close', () => {
    console.log('file closed')
})

stream.on('error', (err) => {
    console.log('something went wrong!')
    console.log(err)
});

stream.on('data', (chunk) => {
    ++readCount
    console.log(chunk)
}); 
*/


stream.pipe(process.stdout)

let readCount = 0;

stream.on('data', (chunk) => {
    ++readCount
}); 

stream.on('end', () => {
    console.log('End of file')
    console.log('readCount = ', readCount)
});

stream.on('close', () => {
    console.log('file closed')
})

