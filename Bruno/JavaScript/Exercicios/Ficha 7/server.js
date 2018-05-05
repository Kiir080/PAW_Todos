'use-strict';
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const expressSanitizer = require('express-sanitizer'); //Para retirar comandos JS dos pedidos (impedir SQL injection etc...)

const bcrypt = require('bcrypt');
const saltRounds = 10;

app.use(express.static(__dirname + '/views'));

const  {mongoManager} = require('./mongoManager');
let mongoM= new mongoManager('testeM','users');


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/form.html');
});

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(expressSanitizer());

app.get('/x',(req,res)=>{
    mongoM.findDocument({Email: "a"},function(x){
       x.forEach(element => {
           console.log(element);  
         });
    });
      
   });

   

app.post('/submit', (req, res) => {
   bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
    // console.log(req.body.password);
    // console.log(hash);
    // console.log(req.body.username);
    
    // req.body.sanitized = req.sanitize(req.body.password);  //Caso queira Sanitizar algum campo
    // console.log(req.body.sanitized);
        

    let x = {Nome: req.body.username,Password:hash,Email: req.body.email};

    mongoM.findDocument({Email: "brunocunha.1357@gmail.com"},function(result){
        if(result.fetch().length ===0){
            console.log('Insere');
         //   mongoM.insertDocument(x);
        }else{
            console.log('Já existe');
        }
     });        
   
    });
});





app.listen(8000, () => {
    console.log('Servidor ativo na porta 8000');
});
