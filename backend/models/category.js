const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const CategorySchema = new Schema({
    name:{
        type:String,
        required:true,
        unique:true,
    },
    slug:{
        type:String,
    },
    image:{
        type:String,
    },
},{timestamps:true});


const Category = mongoose.model("Category", CategorySchema);

module.exports = Category;