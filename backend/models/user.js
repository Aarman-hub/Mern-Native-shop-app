const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        max:32
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        required:true,
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    street:{
        type:String,
        default:'',
    },
    apartment: {
        type:String,
        default:''
    },
    zip:{
        type:String,
        default:''
    },
    city:{
        type:String,
        default:''
    },
    country:{
        type:String,
        default:''
    },
},{timestamps:true});

userSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

userSchema.set('toJSON', {
    virtuals:true,
});


const User = mongoose.model("User", userSchema);

module.exports = User;