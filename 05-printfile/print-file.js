const fs = require('fs');
try {
    const fileContents = fs.readFileSync('sample.txt', { encoding : 'utf8'})
    console.log(fileContents);
} catch (err) {
    console.log('something went wrong')
    console.log(err)
}
