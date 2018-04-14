var http = require('http');
var fs = require('fs');
var path = require('path');
var url = require('url');


http.createServer(function (request, response) {
    console.log('request ', request.url);
    var q = url.parse(request.url, true);
    var filePath = '.' + request.url;
    if (filePath == './') {
        filePath = './form.html';
    }

    if(q.pathname=='/submit'){
       
        var qdata = q.query; 
        fs.writeFile('xpto.txt',JSON.stringify(qdata), function (err) {
            if (err) throw err;
            console.log('Saved!');
          }); 
    }
    else{
    var extname = String(path.extname(filePath)).toLowerCase();
    var mimeTypes = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.gif': 'image/gif',
        '.wav': 'audio/wav',
        '.mp4': 'video/mp4',
        '.woff': 'application/font-woff',
        '.ttf': 'application/font-ttf',
        '.eot': 'application/vnd.ms-fontobject',
        '.otf': 'application/font-otf',
        '.svg': 'application/image/svg+xml'
    };


    var contentType = mimeTypes[extname] || 'application/octet-stream';


    fs.readFile(filePath, function(error, content) {
        if (error) {
            if(error.code == 'ENOENT'){
                fs.readFile('./404.html', function(error, content) {
                    response.writeHead(200, { 'Content-Type': contentType });
                    response.end(content, 'utf-8');
                });
            }
            else {
                response.writeHead(500);
                response.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
                response.end();
            }
        }
        else {
            response.writeHead(200, { 'Content-Type': contentType });
            response.end(content, 'utf-8');
        }
    });
}
}).listen(30);
console.log('Server running at http://127.0.0.1:30/');