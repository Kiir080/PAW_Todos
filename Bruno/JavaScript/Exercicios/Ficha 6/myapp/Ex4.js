const app = require('express')();

const http = require('http').createServer(app);

const io = require('socket.io')(http);



io.on('connection', (socket) => {

    socket.on('hello-message', data => console.log(data));

    setInterval( function(){
        socket.emit('server-answer', {
            message: 'server is calling you'
        })}, 2000);

});



//Example without jade

app.get('/', (req, res) => {

    res.sendFile(__dirname + '/views/index.html');

});



http.listen(8000, () => {

    console.log('Example app listening on port 8000!');

});