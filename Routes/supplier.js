const express = require('express');
const router = express.Router();
const supplierController = require('../Controller/supplier');

// api/supplier
router.post('/', supplierController.createSupplier);
router.get('/', supplierController.getSupplier);
router.put('/:id', supplierController.addSupplier);
router.get('/:id', supplierController.editSupplier);
router.delete('/:id', supplierController.removeSupplier);

module.exports = router;