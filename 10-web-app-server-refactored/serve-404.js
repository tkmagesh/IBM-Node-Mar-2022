function serve404(req, res, next){
    console.log('[@serve404] - serving 404')
    res.statusCode = 404;
    res.end();
    return next()
}

module.exports = serve404;