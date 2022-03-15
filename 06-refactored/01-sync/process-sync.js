const calculatorParser = require('./calculator-parser');
const calculator = require('./calculator');

try {
    const calculatorData = calculatorParser('./calculator.csv')
    calculatorData.forEach(dataObj => {
        const {op, x, y} = dataObj
        const result = calculator[op](x, y)
        console.log(`[${op}] ${x} & ${y} = ${result}`)
    });
} catch (err) {
    console.log('something went wrong!', err)
}