const Employee = require('../Model/employee')

exports.createEmployee = async (req, res) => {

    try{
        let employee;

        employee = new Employee(req.body);

        await employee.save();
        res.send(employee);
    } 
    catch (error) {
        console.log(error);
        res.status(500).send('There is an error');
    }
}

exports.getEmployee = async(req, res) => {

    try {
        const employee = await Employee.find();
        res.json(employee)
    }
    catch (error) {
        console.log(error);
        res.status(500).send('There is an error');
    }
}

exports.addEmployee = async (req, res) => {

    try{
        const { employee_no, name, role, department } = req.body;
        let employee = await Employee.findById(req.params.id);

        if(!employee) {
            res.status(404).json({ msg: 'No existing employee'})
        }

        employee.employee_no = employee_no;
        employee.name = name;
        employee.role = role;
        employee.department = department;

        employee = await Employee.findOneAndUpdate({ _id: req.params.id}, employee, {new:true})
        res.json(employee);
    }
    catch(error) {
        console.log(error);
        res.status(500).send('There is an error');
    }
}

exports.editEmployee = async (req,res) => {

    try{
        let employee = await Employee.findById(req.params.id);

        if(!employee) {
            res.status(404).json({ msg: 'No existing employee'})
        }
        res.json(employee);
    }
    catch (error) {
        console.log(error);
        res.status(500).send('There is an error');
    }
}

exports.removeEmployee = async (req,res) => {

    try{
        let employee = await Employee.findById(req.params.id);

        if(!employee) {
            res.status(404).json({ msg: 'No existing employee'})
        }
        await Employee.findOneAndRemove({_id: req.params.id})
        res.json({msg: 'Employee removed'});
    }
    catch (error) {
        console.log(error);
        res.status(500).send('There is an error');
    }
}

