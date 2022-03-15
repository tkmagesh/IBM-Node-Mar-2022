//Raw implementation
/* 
const fs = require('fs'),
    calculator = require('./calculator');

const stream = fs.createReadStream('./calculator.csv', { encoding : 'utf8', highWaterMark : 1024}) 

stream.on('error', err => {
    console.log('something went wrong!')
    console.log(err)
});

let remainderChunk = ''
let count = 0;

stream.on('data', chunk => {   
    const fileContents = remainderChunk + chunk
    const lines = fileContents.split('\n')
    lines.forEach(line => {
        const cols = line.split(',');
        if (cols.length !== 3){
            remainderChunk = line
            return
        }
        const [op, n1, n2] = cols
        const n1Value = parseInt(n1),
            n2Value = parseInt(n2);
        console.log(`${line}`)
        const result = calculator[op](n1Value, n2Value)
        console.log(`${result}`)
        count++
    })
})

stream.on('end', () => {
    console.log('count = ', count)
});
*/

const CalculatorParser = require('./calculator-parser'),
    calculator = require('./calculator');

const parser = new CalculatorParser('./calculator.csv');

parser.on('instruction', (obj) => {
    const { op, n1, n2 } = obj;
    const result = calculator[op](n1, n2)
    console.log(`${op} ${n1} ${n2} = ${result}`)
});

parser.on('end', () => {
    console.log('Thats all folks!')
})

