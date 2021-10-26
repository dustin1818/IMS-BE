var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Schema instance is created
var UserSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        spare: true
    },
    phoneNo: {
        type: Number,
        unique: true
    },
    location: {
        type: String,
    },
    position: {
        type: String,
    },
    activeStatus: {
        type: Boolean,
        default: true
    }
},
    {
        timestamps: true
    });

// Model is created
var UserModel = mongoose.model('user', UserSchema);

// export model
module.exports = UserModel;