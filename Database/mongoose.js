const mongoose = require('mongoose');
require('dotenv/config');

const connection_URI = "mongodb+srv://User:user123@cluster0.syl2u.mongodb.net/NewUserRegistration?retryWrites=true&w=majority";

const connectionParams = {
    useNewUrlParser: true,
    autoIndex: true,
    useUnifiedTopology: true
}

mongoose.connect(connection_URI, connectionParams)
    .then( () => {
        console.log('Connected to database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. \n${err}`);
    })

module.exports = mongoose;