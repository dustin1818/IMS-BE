// NPM packages
const _ = require('lodash');
const moment = require ("moment");
const axios = require ("axios");

// Mongoose Schema
const Product = require('../Model/product.model');

//add Product
exports.addProduct = async (req, res, next) => {
    try {
        let newProduct = await Product.create(req.body);

        res.status(200).send({
            message: "Product has been created!",
            status: newProduct
        });
        
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
        });
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
        });
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
};


//integration
exports.integrationProductList = async (req, res) => {
    try {
        let fetchProductFromIntegration = await axios.get(`https://klylylydeee-cors.herokuapp.com/https://daps-node-server.herokuapp.com/order`, {
            headers: {
                "access-control-allow-origin": "*",
                "origin": "*",
                "x-requested-with": "XMLHttpRequest"
            }
        }
        );
        res.sent({
            product_length: fetchProductFromIntegration.data.length,
            list: fetchProductFromIntegration.data,
        });
    } catch (err) {
        res.status(502).send({
            status: "Error!",
            message: "Sorry, there seems to be an error."
        });
    }
};

exports.integrationProductQuery = async (req, res) => {
    if(req.query.id === null || res.query.id === undefined) {
        res.send({ message: "Missing a query parameter"});
    }
    try {
        let fetchProductByIdFromIntegration = await axios.get(`https://klylylydeee-cors.herokuapp.com/https://daps-node-server.herokuapp.com/order/${req.query.id}`,{
            headers: {
                "access-control-allow-origin": "*",
                "origin": "*",
                "x-requested-with": "XMLHttpRequest"
            }
        }
        );
        res.send({
            product:fetchProductByIdFromIntegration.data 
        });
    } catch (err) {
        res.status(502).send({
            status: "Error!",
            message: "Sorry, there seems to be an error."
        });
    }
};

exports.integrationProductDeplete = (req,res) => {
    if (
        req.query.id === null ||
        req.query.id === undefined ||
        req.query.quantity === null ||
        req.query.quantity === undefined
    ) {
        res.send({ message: "Missing a query parameter"});
    }
    let productFound;
    Product.findOne({ _id: String (req.query.id)}).then((currentProduct) => {
        if(currentProduct === null) {
        res.send({
            message: `No product with ID${req.query.id} was found`,
        });
    }
    
    currentProduct.quantity < req.query.quantity ? res.send({
        message: "Quantity bought is larger than quantity in stock!",
    })
    : (productFound = currentProduct.quantity);
    Product.findOneAndUpdate(
        { _id: String(req.query.id)},
        {
            $set: {
                quantity: Number(productFound) - Number(req.query.quantity),
            },
        },
        {new: true}
    )
        .then((updateResult) => {
            res.send({
                message: "Product has been updated!",
                updateResult,
        });
    })
        .catch((updateError) => {
            res.send({ message: updateError.message});
        });
    });

};
exports.integrationAnalytics = async (req,res) => {
    try{
        let fetchProductFromIntegration = await axios.get(`https://klylylydeee-cors.herokuapp.com/https://daps-node-server.herokuapp.com/order`, 
        {
            headers: {
                "access-control-allow-origin": "*",
                "origin": "*",
                "x-requested-with": "XMLHttpRequest"
            }
        }
        );
        let aggregateByMonth = {
            January: [],
            February: [],
            March: [],
            April: [],
            May: [],
            June: [],
            July: [],
            August: [],
            September: [],
            October: [],
            November: [],
            December: [],
        };
        fetchProductFromIntegration.data.map((selectedProduct) => 
        {
            aggregateByMonth[`${moment(selectedProduct.timestamp).format("MMMM")}`].push(
                selectedProduct
            );
        });
        let countMap = {
            January: 0,
            February: 0,
            March: 0,
            April: 0,
            May: 0,
            June: 0,
            July: 0,
            August: 0,
            September: 0,
            October: 0,
            November: 0,
            December: 0,
        };
        Object.values(aggregateByMonth).map((month, key) => {
            countMap[`${moment().month(key).format("MMMM")}`] = month.length;
        });
        
        res.send({ count: countMap, data: aggregateByMonth });

    } catch (err){
        console.log(err)
        res.status(502).send({
            status:"Error!",
            message: "Sorry there seems to be an error.",
        });
    }
}
