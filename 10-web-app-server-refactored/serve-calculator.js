const url = require('url'),
    calculator = require('./calculator');

function serveCalculator(req, res, next){
    const resource = req.urlObj.pathname;
    if (resource === '/calculator' && req.method === "GET"){
        const op = req.query.op,
            n1 = parseInt(req.query.n1),
            n2 = parseInt(req.query.n2);
        if (!calculator.hasOwnProperty(op)){
            res.statusCode = 400;
            res.end()
            return next()
        }
        const result = calculator[op](n1, n2)
        res.write(result.toString());
        res.end();
        return next()
    } else if (resource === '/calculator' && req.method === "POST"){
        //extracting data from the request body & parse them
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
            const op = formDataObj.op,
                n1 = parseInt(formDataObj.n1),
                n2 = parseInt(formDataObj.n2);
            if (!calculator.hasOwnProperty(op)){
                res.statusCode = 400;
                res.end()
                return next()
            }
            const result = calculator[op](n1, n2)
            res.write(result.toString());
            res.end();
            return next()
        })
    } else {
        next()
    }
}

module.exports = serveCalculator;