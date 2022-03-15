const fs = require('fs'),
    calculatorParser = require('./calculator-parser'),
    calculator = require('./calculator');
    
calculatorParser('./calculator.csv', (err, calculatorData) => {
    if (err) {
        console.log('something went wrong!')
        console.log(err)
        return
    }
    calculatorData.forEach(dataObj => {
        const {op, x, y} = dataObj
        const result = calculator[op](x, y)
        console.log(`[${op}] ${x} & ${y} = ${result}`)
    });
});
    
       
    

/* 

    Refactor this program as follows:
        move the file read , line parsing, data parsing to calculator-parser.js (line 4 - 14)

    This programm will get the parsed info from the calculator-parser,
        call the calculator with appropriate inputs
        print the result

*/