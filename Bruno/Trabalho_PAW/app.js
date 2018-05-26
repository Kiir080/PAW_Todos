const express = require('express');
const bodyParser = require('body-parser');
var expressSanitizer = require('express-sanitizer');
const app = express();

app.use(express.static(__dirname + '/views')); //ver ficha 7 caso precise


//Middleware to handle POST requests
app.use(bodyParser.urlencoded({ extended: true }));
//Middleware to sanitize data
app.use(expressSanitizer());

const rececaoRoutes = require('./routes/rececaoRoutes.js');

app.use('/', rececaoRoutes);

app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
});

app.listen(8000, () => { 
    console.log('Ex ample app listening on port 8000!'); 
});