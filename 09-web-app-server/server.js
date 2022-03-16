/* 
server listens on port 8080
    if the request is for static resource (html, css, xml, json, js, png, jpg, gif, etc.)
        if the resource exists
            serve the resource
        else
            serve 404
    else if the request is for '/calculator'
        extract the data (based on the request method)
        calculate the result
        serve the result
    else
        serve 404 
*/