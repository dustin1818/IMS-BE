// NPM packages
const _ = require('lodash');

// Mongoose Schema
const Product = require('../Model/product.model');

//add Product
exports.addProduct = async (req, res, next) => {
    try {
        let newProduct = await Product.create(req.body);

        res.status(200).send({
            message: "Product has been created!",
            status: newProduct
        })
        
    } catch (err) {
        err.statusCode === undefined ? err.statusCode = 500 : '';
        return next(err);
    }
}

//retrieve all Products
exports.getProduct = async (req, res, next) => {
    try {
        // find all Products and sort by id in descending order
        let getProduct = await Product.find().sort({_id: -1}); 
        res.status(200).send({
            payload: getProduct
        })
    } catch (err) {
        err.statusCode === undefined ? err.statusCode = 500 : '';
        return next(err);
    }
}

//retrieve a single Product
exports.getSingleProduct = async (req, res, next) => {
    try {
        let getSingleProduct = await Product.findOne({ _id: req.params.id });
        res.status(200).send({
            payload: getSingleProduct
        })
    } catch (err) {
        err.statusCode === undefined ? err.statusCode = 500 : '';
        return next(err);
     }
}

//update Product
exports.updateProduct = async (req, res, next) => {
    //check if Product exists in the database
    Product.exists({ _id: req.params.id }).then((result) => {
        if (!result) {
            return res.status(400).send(`No Product found with given id:${req.params.id}`);
        } else {
            //fetch Product document
            Product.findById(req.params.id, (err, post) => {
                if (err) return next(err);

                //update Product using lodash
                _.assign(post, req.body);
                post.save((err) => {
                    if(err) return next(err);

                    return res.status(200).json(post);
                })
            });
        }
    });
}

//delete Product
exports.deleteProduct = async (req, res, next) => {
    try {
        let deletedProduct = await Product.findByIdAndDelete({ _id: req.params.id });

        res.status(200).send({
            payload: deletedProduct
        });
    } catch (err) {
        err.statusCode === undefined ? err.statusCode = 500 : '';
        return next(err);
    }
}