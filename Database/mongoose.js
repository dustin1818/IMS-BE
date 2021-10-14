const mongoose = require('mongoose');
require('dotenv/config');

const connection_URI = "mongodb+srv://Joelson:Joe7MongoDB@initial-cluster.vie6y.mongodb.net/IMS-Database?retryWrites=true&w=majority";

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