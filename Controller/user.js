var express = require('express');
var router = express.Router();

// models
var UserModel = require('../Model/user-model');

router.route('/profile')
    .get(function (req, res, next) {
        var userid = req.decoded._id;
        UserModel.findById({ _id: userid }).exec(function (err, user) {
            if (err) return res.status(500).json({
                error: err
            });
            if (user) {
                return res.status(200).json(user);
            } else {
                return res.status(404).json({
                    message: 'User not found.'
                })
            }
        })
    })

    
    router.route('/') .get(async (req, res) => {
    try {

        const user = await UserModel.find();
        res.json(user)
        
    } catch (error) {
        console.log(error);
        res.status(500).send('There is an error');
    }

    })


module.exports = router;
