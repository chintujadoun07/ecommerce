const express=require('express');
const productRouter=express.Router();
const Product=require('../models/Product')
const mongoose = require('mongoose'); // Ensure mongoose is imported


//get all products
productRouter.get('/',async(req,res)=>{
    const product= await Product.find({});
    res.json(product);
})
//Get product by ID

productRouter.get('/:id', async (req, res) => {
    const { id } = req.params;

    // Check if the provided ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ msg: 'Invalid product ID' });
    }

    try {
        const product = await Product.findById(id);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ msg: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
});

module.exports=productRouter;