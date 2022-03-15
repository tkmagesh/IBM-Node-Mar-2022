const fs = require('fs');

function calculatorParser(fileName){
    try {
        const fileContents = fs.readFileSync(fileName, { encoding : 'utf8'})
        const lines = fileContents.split('\n')
        const calculatorData = [];
        lines.forEach(line => {
            /* 
            const cols = line.split(',')
            const op = cols[0],
                n1 = cols[1],
                n2 = cols[2]; 
            */
            const [op, n1, n2] = line.split(',');
            const n1Value = parseInt(n1),
                n2Value = parseInt(n2);
            const dataObj = { op : op, x : n1Value, y : n2Value };
            calculatorData.push(dataObj)
        })
        return calculatorData
    } catch (err) {
        throw err
    }
}

module.exports = calculatorParser;