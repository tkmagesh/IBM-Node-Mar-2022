function serve404(res){
    res.statusCode = 404;
    res.end();
}

module.exports = serve404;