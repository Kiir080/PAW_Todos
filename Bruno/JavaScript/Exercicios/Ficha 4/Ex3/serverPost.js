var http = require('http');
var fs = require('fs');
var path = require('path');

function checkData(qdata, callback){
    let res = '{"' + qdata.replace(/=/g,'":"').replace(/&/g,'","')+'"}';
    let a = JSON.parse(res);
    callback(a);
}

http.createServer(function (request, response) {
    console.log('request ', request.url);
    var filePath = '.' + request.url;
    if (filePath == './') {
        filePath = './form.html';
    }

    if (request.method === 'POST' && request.url === '/submit') {

       
        let qdata= [];

        request.on('data', (chunk) => {
         qdata.push(chunk);
        }).on('end', () => {
            qdata = Buffer.concat(qdata).toString();
            checkData(qdata, function writeFile(a){
                fs.writeFile('xptoPost.json',a, function (err) {
                    if (err) throw err;
                    console.log('Saved!');
                });
            });
            console.log('All data readed!!');
        });

        

     
    } else {
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

        

        fs.readFile(filePath, function (error, content) {
            if (error) {
                if (error.code == 'ENOENT') {
                    fs.readFile('./404.html', function (error, content) {
                        response.writeHead(200, {
                            'Content-Type': contentType
                        });
                        response.end(content, 'utf-8');
                    });
                } else {
                    response.writeHead(500);
                    response.end('Sorry, check with the site admin for error: ' + error.code + ' ..\n');
                    response.end();
                }
            } else {
                response.writeHead(200, {
                    'Content-Type': contentType
                });
                response.end(content, 'utf-8');
            }
        });
    }
}).listen(30);
console.log('Server running at http://127.0.0.1:30/');

