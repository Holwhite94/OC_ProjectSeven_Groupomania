//user controllers - login/ sign up - need jsonwebtoke and bcrypt for passwords

//import authentication
const jwt = require("jsonwebtoken");
const authMiddleware = require('../middleware/auth');
// import bcrypt
const bcrypt = require("bcrypt");
//.import user model
const {User}= require('../models/models');



//sign up

exports.signup = (req, res, next) => {
bcrypt.hash(req.body.password, 10)
.then((hash) => {
    const user = new User ({
        firstName : req.body.firstName,
        secondName : req.body.secondName, 
        email : req.body.email, 
        password : hash
        });
    
       return user.save(); 
    })
    .then(() => {
        res.status(201).json({
            message: 'User created successfully'
        });
    })
    .catch((error) => {
        res.status(500).json({
                error: error
            });
        }
    );
};

// login 
exports.login = (req, res, next) => {
    const { email, password } = req.body;
  
    //use where as method to find user using sequelize 
    User.findOne({ where: { email: email } })
      .then((user) => {
        if (!user) {
          return res.status(401).json({
            error: new Error("User not found!"),
          });
        }
  
        bcrypt.compare(password, user.password)
          .then((valid) => {
            if (!valid) {
              return res.status(401).json({
                error: new Error("Password not valid"),
              });
            }
            // generate token with user id and email adress in :)
            const token = jwt.sign({ userId: user.id, email: user.email }, "RANDOM_TOKEN_SECRET", {
              expiresIn: "24h",
            });
            
            res.status(200).json({
              userId: user.id,
              email: user.email,
              token: token,
            });
          })
          .catch((error) => {
            res.status(500).json({
              error: error,
            });
          });
      })
      .catch((error) => {
        res.status(500).json({
          error: error,
        });
      });
  };


// delete account 
exports.deleteUser = [
  authMiddleware,
  async (req, res, next) => {
    try {
    
      const id = req.auth.userId;
      
      if (!id) {
        return res.status(401).json({ error: 'User ID not found in request' });
      }
      
      const user = await User.findByPk(id);
      

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      
      if (id !== user.id) {
        return res.status(403).json({ error: 'Unable to delete account' });
      }

  
      await user.destroy();

      return res.status(200).json({ message: 'Account deleted!' });
    } catch (error) {
      return res.status(500).json({ error: 'Server error' });
    }
  }
];