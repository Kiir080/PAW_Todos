const {
  mongoManager
} = require('../Modulo_Mongoose/mongoManager');

const userSchema = require('../Modulo_Mongoose/schemas/user');

const bcrypt = require('bcrypt');
const saltRounds = 10;

const mongoMan = new mongoManager('mongTest', 'users');

const User = mongoMan.connect(userSchema);

function signUp(body) {
  bcrypt.hash(body.password, saltRounds, function (err, hash) {
    body.password = hash;
    let temp = new User(body);

    //User.find({ $or:[{'username': temp.username},{'email': temp.email } ] },function(err,res)

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

function signIn(body) {
  console.log(body.password);
  bcrypt.hash(body.password, saltRounds, function (err, hash) {
    console.log(hash);
    body.password = hash;

    User.find({
      username: `${body.username}`
    }).and([{
      password: `${body.password}`
    }]).exec(function(err, res) {
      if (err) throw err;

      if (res.length === 1) {
        console.log('Utilizador existe');
        mongoMan.disconnect();
      } else {
        console.log("Utilizador Não existe");
        mongoMan.disconnect();
      }


         
      });
      



    });

   
  
}


exports.signUp = signUp;
exports.signIn = signIn;