var jwt = require('jsonwebtoken');
var config = require('../Configuration/config')


module.exports = function (req, res, next) {
    var token;

    if (req.headers.token) {
        token = req.headers.token.split(" ")[1];
    }
    if (req.headers['x-access-token']) {
        token = req.headers['x-access-token'].split(" ")[1];
    }
    if (req.headers['authorization']) {
        token = req.headers['authorization'].split(" ")[1];
    }
    if (req.query.token) {
        token = req.query.token.split(" ")[1]
    }

    if (!token) {
        return res.status(400).json({
            success: false,
            message: 'Token not provided.'
        })
    } else {
        jwt.verify(token, config.jwtSecretKey, function (err, verified) {
            if (err) return res.json({success: false, message: 'Token invalid: ' + err});
            req.decoded = verified;
            next();      
        });
    }
}