const mongoose = require('mongoose');
require('dotenv').config();

const db = process.env.MONGO_URI

const connectDB = async () =>{
    try {
        mongoose.connect(db,{
            useNewUrlParser:true,
        });
        console.log("Database Connected");
    } catch (error) {
        process.exit(1);
    }
}

module.exports = connectDB;