const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ProductSchema = new Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    description:{
        type:String,
        required:true,
    },
    rechDescription:{
        type:String,
        default:''
    },
    image:{
        type:String,
        default:''
    },
    images:{
        type:String
    },
    brand:{
        type:String,
        default:''
    },
    price:{
        type:Number,
        default:0
    },
    category:{
        type:Schema.Types.ObjectId,
        ref:'Category',
        required:true
    },
    countInStock:{
        type:Number,
        required:true,
        min:0,
        max:255
    },
    rating:{
        type:Number,
        default:0
    },
    numReviews:{
        type:Number,
        default:0,
    },
    isFeatured:{
        type:Boolean,
        default:false
    },
    dateCreated:{
        type:Date,
        default:Date.now,
    },
},{timestamps:true});


ProductSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

ProductSchema.set('toJSON',{
    virtuals:true,
});



const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;