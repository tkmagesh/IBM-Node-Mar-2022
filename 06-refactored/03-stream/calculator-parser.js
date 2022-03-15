
/* 
const events = require('events')
const EventEmitter = events.EventEmitter 
*/

const { EventEmitter } = require('events')
const fs = require('fs')

class CalculatorParser extends EventEmitter {
    fileName = ''
    stream = null
    remainderChunk = ''

    constructor(fileName){
        super()
        this.fileName = fileName
        if (!fs.existsSync(fileName)){
            throw new Error('File doesnot exists')
        }
        this.stream = fs.createReadStream(this.fileName, {encoding : 'utf8', highWaterMark : 1024});
        this.stream.on('data', chunk => this.parseChunk(chunk))
        this.stream.on('end', () => this.emit('end'));
        this.stream.on('error', err => this.emit('error', err))
    }

    parseChunk(chunk){
        try {
            const fileContents = this.remainderChunk + chunk
            const lines = fileContents.split('\n')
            lines.forEach(line => {
                const cols = line.split(',');
                if (cols.length !== 3){
                    this.remainderChunk = line
                    return
                }
                const [op, n1, n2] = cols
                const n1Value = parseInt(n1),
                    n2Value = parseInt(n2);
                const calculatorData = { op : op, n1 : n1Value, n2 : n2Value };
                this.emit('instruction', calculatorData)
            })
        } catch (err) {
            this.emit('error', err)
        }
    }

}

module.exports = CalculatorParser