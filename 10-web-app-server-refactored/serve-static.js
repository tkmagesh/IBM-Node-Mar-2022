const path = require('path'),
    fs = require('fs');

const staticResourceExtns = ['.html', '.js', '.css', '.jpg', '.png', '.ico', '.xml', '.json'];

function isStatic(resource){
    const extn = path.extname(resource);
    return staticResourceExtns.indexOf(extn) >= 0;
}

function serveStatic(req, res, next){
    const resource = req.urlObj.pathname
    if (isStatic(resource)){ 
        const resourcePath = path.join(__dirname, resource);
        if (!fs.existsSync(resourcePath)){
            return next()
        }
        const stream = fs.createReadStream(resourcePath)
        stream.pipe(res)
        stream.on('end', () => {
            next()
        });
        stream.on('error', () => {
            res.statusCode = 500;
            res.end();
            next()
        }); 
    } else {
        next()
    }
}
module.exports = serveStatic;