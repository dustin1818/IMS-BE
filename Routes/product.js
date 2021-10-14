//NPM Packages
const express = require("express");
const router = express.Router();

// Product Controller
const productController = require("../Controller/product");

// HTTP Request Route: GET - http://localhost:3000/product
router.get('/', productController.getProduct);

// HTTP Request Route: GET - http://localhost:3000/product/id
router.get('/:id', productController.getSingleProduct);

// HTTP Request Route: PATCH - http://localhost:3000/product/id
router.patch('/:id', productController.updateProduct);

// HTTP Request Route: POST - http://localhost:3000/product
router.post('/', productController.addProduct);

// HTTP Request Route: PUT - http://localhost:3000/product/id
router.delete('/:id', productController.deleteProduct);

module.exports = router;