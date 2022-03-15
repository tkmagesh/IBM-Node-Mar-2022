const fs = require('fs');

const fileContents = fs.readFileSync('sample.txt', { encoding : 'utf8'})
console.log(fileContents)
