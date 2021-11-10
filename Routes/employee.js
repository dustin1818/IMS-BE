const express = require('express');
const router = express.Router();
const employeeController = require('../Controller/employee');

//api/employee

router.post('/', employeeController.createEmployee);
router.get('/', employeeController.getEmployee);
router.put('/:id', employeeController.addEmployee);
router.get('/:id', employeeController.editEmployee);
router.delete('/:id', employeeController.removeEmployee);

module.exports = router;
