/*
PRODUCT SCHEMA
*/

// NPM packages
const { Schema, model } = require('mongoose');
const moment = require('moment-timezone');
const autoIncrement = require('mongoose-auto-increment')

// Schema model
const productSchema = new Schema({
    // Product_ID is the ObjectID
    product_name: {
        type: String,
        required: true
    },

    product_type: {
        type: String,
        enum: [
            'Glass',
            'Can',
            'Plastic'
        ],
        required: true
    },

    quantity: {
        type: Number,
        required: true
    },

    price: { // price per pallet
        type: Number,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    manufacture_name: {
        type: String,
        required: true
    }
},
{
    // timestamps: createdAt and updatedAt fields
    timestamps: {
        currentTime: () => {
            return moment().utc("Asia/Singapore").format();
        }
    }
});

// Auto-increment plugin that implements interger Object_id that increments automatically. 
productSchema.plugin(autoIncrement.plugin, 'product');

const ProductSchema = model('product', productSchema);

module.exports = ProductSchema;