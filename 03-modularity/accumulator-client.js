var accumulatorFactory = require('./accumulator')

var accumulator = accumulatorFactory()
accumulator.add(100)
accumulator.subtract(50)
accumulator.multiply(10)
accumulator.divide(4)
console.log(accumulator.getResult())

var accumulator2 = accumulatorFactory()
console.log(accumulator2.getResult())