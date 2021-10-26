var express = require('express');
var router = express.Router();
var config = require('../Configuration/config')
var jwt = require('jsonwebtoken');
var passwordHash = require('password-hash');

//import 
var UserModel = require('../Model/user-model');
var mapUser = require('../Configuration/map_user_req');


// To GENETRATE TOKEN
function generateToken(user) {
    return jwt.sign({ _id: user._id }, config.jwtSecretKey,{ expiresIn : '24h'});
}


//register
router.post('/register', function (req, res, next) {
        console.log('Requested data => ', req.body);
        // Instance of User Model is created.
        var newUser = new UserModel({});
        var newMappedUser = mapUser(newUser, req.body);
        if (req.body.password) {
            newMappedUser.password = passwordHash.generate(req.body.password);
        };

        newMappedUser.save(function (err, done) {
            // Check if error occured
            if (err) {
                // Check if error is an error indicating duplicate account
                if (err.code === 11000) {
                   return res.json({ success: false, message: 'Username or Email already exists.' });
                } else {
                    if (err.errors) {
                        if (err.errors.email) {
                           return res.json({ success: false, message: err.errors.email.message });
                        } else {
                            if (err.errors.username) {
                               return res.json({ success: false, message: err.errors.username.message }); 
                            } else {
                                if (err.errors.password) {
                                   return res.json({ success: false, message: err.errors.password.message }); 
                                } else {
                                  return  res.json({ success: false, message: err });
                                }
                            }
                        }
                    } else {
                      return   res.json({ success: false, message: `Could not save user. Error: ${err}` });
                    }
                }
            } else {
               return  res.json({ success: true, message: 'Account succesfully registered !' })
            }
        })
    });


//login
router.post('/login', function (req, res, next) {
        console.log('Requested data => ', req.body);

        UserModel.findOne({ email: req.body.email })
            .exec(function (err, user) {
                if (err) {
                    return res.json({
                        success: false,
                        error: err,
                        status: 500
                    });
                }
                if (user) {
                    var passwordMatch = passwordHash.verify(req.body.password, user.password);
                    if (passwordMatch) {
                        var token = generateToken(user);
                        return res.json({
                            success: true,
                            user: {
                            username : user.username,  
                            position : user.position                          
                            },
                            token: token,
                            message: 'User Login is Successful !',
                            status: 200
                        });
                    } else {
                        return res.json({
                            success: false,
                            message: 'Password didnt match. Try again.',
                            status: 401
                        })
                    }
                } else {
                    return res.json({
                        success: false,
                        message: 'Invalid Email',
                        status: 401
                    })
                }
            })
    }); 


module.exports = router;