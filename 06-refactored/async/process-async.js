const fs = require('fs'),
    calculator = require('./calculator');

fs.readFile('./calculator.csv', { encoding : 'utf8'}, (err, fileContents) => {
    if (err) {
        console.log('something went wrong!')
        console.log(err)
        return
    }
    const lines = fileContents.split('\n')
    lines.forEach(line => {
        const [op, n1, n2] = line.split(',');
        const n1Value = parseInt(n1),
            n2Value = parseInt(n2);
        const result = calculator[op](n1Value, n2Value)
        console.log(`[${op}] ${n1} & ${n2} = ${result}`)
    })
})

/* 

    Refactor this program as follows:
        move the file read , line parsing, data parsing to calculator-parser.js (line 4 - 14)

    This programm will get the parsed info from the calculator-parser,
        call the calculator with appropriate inputs
        print the result

*/