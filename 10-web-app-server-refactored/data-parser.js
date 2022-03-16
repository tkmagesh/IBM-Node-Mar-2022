const url = require('url');

function dataParser(req, res){
    const urlObj = new url.URL(req.url, 'http://localhost:8080');
    urlObj.pathname = urlObj.pathname === '/' ? '/index.html' : urlObj.pathname;
    const querystringObj = {}
    for (let [key, value] of urlObj.searchParams){
        querystringObj[key] = value
    }
    req['urlObj'] = urlObj;
    req['query'] = querystringObj;
}

module.exports = dataParser;