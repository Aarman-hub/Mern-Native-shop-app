const express = require('express');
const route = express.Router();
const Category = require("../models/category");

route.get('/category', async (req, res)=>{
    const category = await Category.find();

    if(!category){
      return  res.status(500).json({success:false});
    }

    res.send(category);

});

route.get('/category/:id', async (req, res)=>{
    const category  = await Category.findById(req.params.id);
    if(!category){
        return res.status(500).json({message:"Category was not found"});
    }
    res.status(200).send(category);
});

route.post("/category", async (req, res)=>{
    let category = new Category({
        name:req.body.name
    });

    category = await category.save()

    if(!category){
       return res.status(404).send('Category cannot be created');
    }

    res.send(category);
});


route.put('/category/:id', async (req, res)=>{
    const category  = await Category.findByIdAndUpdate(req.params.id, {name: req.body.name});
    if(!category){
        return res.status(400).json({message:"Category was not updated"}, {new:true});
    }
    res.status(200).send(category);
});

route.delete('/category/:id',(req, res)=>{
    Category.findByIdAndDelete(req.params.id).then(category=>{
        if(category){
            return res.status(200).send({success:true, message:"Category deleted successfully"});
        }else{
            return res.status(404).send({success:false, message:"Category don't delete"});
        }
    }).catch(err=>{
        return res.status(400).send({success:false, message:err});
    });
});


module.exports = route;