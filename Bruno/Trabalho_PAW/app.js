const express = require('express');
const bodyParser = require('body-parser');
var expressSanitizer = require('express-sanitizer');
const app = express();

const {
    mongoManager
} = require('./Modulo_Mongoose/mongoManager.js');

let mongoMan = new mongoManager('hospital');


var session =  require('express-session') ;

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.static(__dirname + '/views')); //ver ficha 7 caso precise


//Middleware to handle POST requests
app.use(bodyParser.urlencoded({ extended: true }));
//Middleware to sanitize data
app.use(expressSanitizer());

const rececaoRoutes = require('./routes/rececaoRoutes.js');
const sessionRoutes = require("./routes/sessionRoutes.js");
const teste = require("./routes/Teste.js");


app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: {}
  }));

  app.use('/',(req, res, next)=>{
    if(req.session.logedIn){
        console.log("you are logedIn");
        res.status(200).sendFile(__dirname + '/views/TriagemHtml.html');
    }else{
        console.log("you aren't logedIn");
    }
    next();
  });

app.use('/', sessionRoutes);
app.use('/', rececaoRoutes);
app.use('/', teste);



app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
});

app.listen(8000, () => { 
    console.log('Example app listening on port 8000!'); 
});