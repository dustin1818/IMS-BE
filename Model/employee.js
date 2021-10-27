const { truncate } = require('lodash');
const mongoose = require('mongoose)');

const EmployeeSchema = mongoose.Schema({

    employee_no: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true 
    },
    role: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    phone_no: {
        type: Number,
        required: true
    },
    CreatedAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Employee', EmployeeSchema);
