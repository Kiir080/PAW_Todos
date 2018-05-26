const {
  mongoManager
} = require('../Modulo_Mongoose/mongoManager');

const userSchema = require('../Modulo_Mongoose/schemas/user');

const bcrypt = require('bcrypt');
const saltRounds = 10;

const mongoMan = new mongoManager('hospital', 'users');

const User = mongoMan.connect(userSchema);


var session = require('express-session');






function signUp(body) {
  bcrypt.hash(body.password, saltRounds, function (err, hash) {
    body.password = hash;
    let temp = new User(body);

    User.find({
      username: `${temp.username}`
    }).or([{
      email: `${temp.email}`
    }]).exec((err, res) => {
      if (err) throw err;

      if (res.length !== 0) {
        console.log("Não inserido");
        mongoMan.disconnect();
      } else {
        temp.save((err) => {
          if (err) throw err;
          console.log('Inserido');
          mongoMan.disconnect();
        });
      }



    });

  });

}

function signIn(body,resp) {

    User.find({
      username: `${body.username}`
    }).exec(function(err, res) {
      if (err) throw err;

      if (res.length === 1) {
        console.log('Utilizador existe');
        bcrypt.compare(body.password, res[0].password, function(err, res) {
          if(res===true){
            resp.status(200).send("palavra passe certa");
          }else{
            resp.status(200).send("palavra passe errada");
          }
          mongoMan.disconnect();
        });
 
      } else {
        console.log("Utilizador Não existe");
        mongoMan.disconnect();
        
      }


         
      });
        
}

exports.signUp = signUp;
exports.signIn = signIn;