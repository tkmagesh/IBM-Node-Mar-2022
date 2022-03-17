const chalk = require('chalk');

function logger(req, res, next){
    let logMessage = `${chalk.red(req.method)} - ${chalk.green(req.url)}`
    const startTime = new Date()
    res.on('finish', () => {
        const endTime = new Date(),
            elapsed = endTime - startTime;
        console.log(`${logMessage} - ${chalk.underline.bgBlue(res.statusCode)} - ${elapsed}`)
    })
    next()
}

module.exports = logger;