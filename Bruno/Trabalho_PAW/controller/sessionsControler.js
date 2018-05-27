const {
  mongoManager
} = require('../Modulo_Mongoose/mongoManager');

const userSchema = require('../Modulo_Mongoose/schemas/user');

const bcrypt = require('bcrypt');
const saltRounds = 10;

const mongoMan = new mongoManager('hospital', 'users');

const User = mongoMan.connect(userSchema);


function signUp(body,callback) {
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
        callback("Não inserido");
        mongoMan.disconnect();
      } else {
        temp.save((err) => {
          if (err) throw err;
          
          callback('Inserido');
          mongoMan.disconnect();
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
          mongoMan.disconnect();
          callback(true,res);
        });
 
      } else {
        console.log("Utilizador Não existe");
        callback(false);
        mongoMan.disconnect();
        
      }


         
      });
        
}

exports.signUp = signUp;
exports.signIn = signIn;