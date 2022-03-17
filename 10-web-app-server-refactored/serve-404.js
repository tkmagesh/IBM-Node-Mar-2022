function serve404(req, res, next){
    if (!res.finished){
        res.statusCode = 404;
        res.end();
        return next()
    }
}

module.exports = serve404;