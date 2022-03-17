function logger(req, res, next){
    let logMessage = `${req.method} - ${req.url}`
    const startTime = new Date()
    res.on('finish', () => {
        const endTime = new Date(),
            elapsed = endTime - startTime;
        console.log(`${logMessage} - ${res.statusCode} - ${elapsed}`)
    })
    next()
}

module.exports = logger;