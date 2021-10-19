const mongoose = require('mongoose');

const SupplierSchema = mongoose.Schema({

    supplier_no: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    phone_no: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    CreatedAt: {
        type: Date,
        default: Date.now()
    }

});

module.exports = mongoose.model('Supplier', SupplierSchema);