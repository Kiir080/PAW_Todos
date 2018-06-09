const {
  mongoManager
} = require('../Modulo_Mongoose/mongoManager');

const userSchema = require('../Modulo_Mongoose/schemas/user');

const bcrypt = require('bcrypt');
const saltRounds = 10;


const User = mongoManager.connect(userSchema, 'users');


function signUp(body,callback) {
  bcrypt.hash(body.password, saltRounds, function (err, hash) {
    body.password = hash;
    let temp = new User(body);

    User.find({
      username: `${temp.username}`
    }).exec((err, res) => {
      if (err) throw err;

      if (res.length !== 0) {
        callback("Não inserido");
      } else {
        temp.save((err) => {
          if (err) throw err;
          
          callback('Inserido');
        });
      }



    });

  });

}

function signIn(body,callback) {

    User.find({
      username: `${body.username}`
    }).exec(function(err, res) {
      if (err) throw err;

      if (res.length === 1) {
        console.log('Utilizador existe');
        bcrypt.compare(body.password, res[0].password, function(err, res) {

          callback(true,res);
        });
      } else {
        console.log("Utilizador Não existe");
        callback(false);
      }


         
      });
        
}

exports.signUp = signUp;
exports.signIn = signIn;