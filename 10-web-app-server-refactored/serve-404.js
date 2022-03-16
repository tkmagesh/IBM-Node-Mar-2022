function serve404(res){
    console.log('[@serve404] - serving 404')
    res.statusCode = 404;
    res.end();
}

module.exports = serve404;