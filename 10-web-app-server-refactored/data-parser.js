const url = require('url');

function dataParser(req, res, next){
    const urlObj = new url.URL(req.url, 'http://localhost:8080');
    urlObj.pathname = urlObj.pathname === '/' ? '/index.html' : urlObj.pathname;
    const querystringObj = {}
    for (let [key, value] of urlObj.searchParams){
        querystringObj[key] = value
    }
    req['urlObj'] = urlObj;
    req['query'] = querystringObj;
    let rawData = '';
    req.on('data', chunk => {
        rawData += chunk;
    });
    req.on('end', ()=> {
        var searchParms = new url.URLSearchParams(rawData)
        const formDataObj = {}
        for (let [key, value] of searchParms){
            formDataObj[key] = value
        };
        req['form'] = formDataObj;
        next();
    });
}

module.exports = dataParser;