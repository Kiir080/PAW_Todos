const express = require('express');
const bodyParser = require('body-parser');
var expressSanitizer = require('express-sanitizer');
const app = express();

//Middleware to handle POST requests
app.use(bodyParser.urlencoded({ extended: true }));
//Middleware to sanitize data
app.use(expressSanitizer());

app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
});


app.listen(8000, () => { 
    console.log('Example app listening on port 8000!'); 
});