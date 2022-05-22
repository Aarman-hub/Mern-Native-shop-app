const express = require('express');
const route = express.Router();
const Product = require('../models/product');
const Category = require('../models/category');

route.get('/product', async (req, res)=>{

    let filter = {};

    if(req.query.categories){
        filter = {category : req.query.categories.split(',')}
    }

    const product = await Product.find({filter}).populate('category');

    if(!product){
        res.status(400).json({success:false});
    }
    res.send(product);

});

route.post('/product', async (req, res)=>{

    const category = await Category.findById(req.body.category)

    if(!category) return res.status(400).send("Invalid category")

    let product = new Product({
        name:req.body.name,
        description:req.body.description,
        rechDescription:req.body.rechDescription,
        image:req.body.image,
        brand:req.body.brand,
        price:req.body.price,
        category:req.body.category,
        countInStock:req.body.price,
        rating:req.body.rating,
        numReviews:req.body.numReviews,
        isFeatured:req.body.isFeatured
    });

    product = await product.save();

    if(!product){
        return res.status(500).send('Product cannot be created.')
    }

    res.send(product)
    
});

route.get('/product/:id', async (req, res)=>{
    const product = await Product.findById(req.params.id).populate('category');

    if(!product){
        res.status(400).json({success:false});
    }
    res.send(product);

});

route.get('/product/get/fetured/:count', async (req, res) =>{

    const count = req.params.count ? req.params.count : 0;    

    const products = await Product.find({isFeatured:true}).limit(+count)

    if(!products){
        return res.status(500).json({success:false});
    }

    res.send(products);
});




module.exports = route;