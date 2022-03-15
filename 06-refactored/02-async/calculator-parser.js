const fs = require('fs');

function calculatorParser(fileName, callbackFn){
    fs.readFile(fileName, { encoding : 'utf8'}, (err, fileContents) => {
        if (err) {
            return callbackFn(err)
        }
        const calculatorData  = [];        
        const lines = fileContents.split('\n')
        lines.forEach(line => {
            const [op, n1, n2] = line.split(',');
            const n1Value = parseInt(n1),
                n2Value = parseInt(n2);
            const dataObj = { op : op, x : n1Value, y : n2Value}
            calculatorData.push(dataObj);
        })
        return callbackFn(null, calculatorData)
    })
}

module.exports = calculatorParser;