const Supplier = require('../Model/supplier')

exports.createSupplier= async (req, res) => {

    try {
        let supplier;

        supplier = new Supplier(req.body);

        await supplier.save();
        res.send(supplier);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('There is an error');
    }
}


exports.getSupplier = async (req, res) => {

    try {

        const supplier = await Supplier.find();
        res.json(supplier)
        
    } catch (error) {
        console.log(error);
        res.status(500).send('There is an error');
    }

}

exports.addSupplier = async (req, res) => {

    try {
        const { supplier_no, name, phone_no, location } = req.body;
        let supplier = await Supplier.findById(req.params.id);

        if(!supplier) {
            res.status(404).json({ msg: 'No existing supplier' })
        }

        supplier.supplier_no = supplier_no;
        supplier.name = name;
        supplier.phone_no = phone_no;
        supplier.location = location;

        supplier = await Supplier.findOneAndUpdate({ _id: req.params.id },supplier, { new: true} )
        res.json(supplier);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('There is an error!');
    }
}


exports.editSupplier = async (req, res) => {

    try {
        let supplier = await Supplier.findById(req.params.id);

        if(!supplier) {
            res.status(404).json({ msg: 'No existing supplier' })
        }
       
        res.json(supplier);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('There is an error!');
    }
}

exports.removeSupplier = async (req, res) => {

    try {
        let supplier = await Supplier.findById(req.params.id);

        if(!supplier) {
            res.status(404).json({ msg: 'No existing supplier' })
        }
       
        await Supplier.findOneAndRemove({ _id: req.params.id })
        res.json({ msg: 'Supplier removed!' });
        
    } catch (error) {
        console.log(error);
        res.status(500).send('There is an error!');
    }
}