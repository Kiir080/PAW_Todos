const express = require('express');
const app=express();

app.get('/',(req,res)=>{
    res.send('Hello World!');
});

app.get('/alunos',(req,res)=>{
    let one=  new aluno('bruno',1,'M');
    let two= new aluno('xpto',2,'F');
    let array= [one,two];
    res.status(200).send(array);
});
app.listen(8000,() => {
    console.log('Servidor ativo na porta 8000');
});

class aluno{
    constructor(name,num,gender){
        this.name=name;
        this.num=num;
        this.gender=gender;
    }
}