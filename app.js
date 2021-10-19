const express = require('express');
const _port = process.env.PORT || 3000;
const cors = require('cors');
const autoIncrement = require('mongoose-auto-increment');
const { createConnection } = require('mongoose');
const connection_URI = " mongodb+srv://Joelson:Joe7MongoDB@initial-cluster.vie6y.mongodb.net/IMS-Database?retryWrites=true&w=majority";
require('./Configuration/config');
require('./Database/mongoose');

const app = express();

// database URI connection required by autoIncrement
const connection = createConnection(connection_URI);

//initialize mongoose-auto-increment
autoIncrement.initialize(connection);

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//handle validation errors within the application
app.use((err, req, res, next) => {
    if (err.name == 'ValidationError') {
        var valErrors = [];
        Object.keys(err.errors).forEach(key => valErrors.push(err.errors[key].message));
        res.status(422).send(valErrors);
    }
});

app.listen(_port, (err) => {
    if (err) { throw err; }
    console.log(`Server started at port: ${_port}`)
});

// Express Routing Table
// http://localhost:3000/products/
app.use('/products', require('./Routes/product'));


//supplier
// http://localhost:3000/suppliers/
app.use('/api/suppliers', require('./Routes/supplier'));