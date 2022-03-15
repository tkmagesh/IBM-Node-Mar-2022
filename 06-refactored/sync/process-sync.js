const fs = require('fs'),
    calculator = require('./calculator');

const fileContents = fs.readFileSync('./calculator.csv', { encoding : 'utf8'})
const lines = fileContents.split('\n')
lines.forEach(line => {
    const [op, n1, n2] = line.split(',');
    const n1Value = parseInt(n1),
        n2Value = parseInt(n2);
    const result = calculator[op](n1Value, n2Value)
    console.log(`[${op}] ${n1} & ${n2} = ${result}`)
})