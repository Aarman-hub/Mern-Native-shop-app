const express = require('express');
const route = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const User = require('../models/user');


const jwtsecret = process.env.JWTSECRET

route.get('/user',(req, res)=>{
    res.send('Hello Auth Route');
});

route.post('/user/register', async (req, res)=>{

    try {
        const { username, email, password, phone} = req.body;

        let user = await User.find({email});

        if(user){
            res.status(400).json({errors:[{msg:"Email already taken."}]})
        }

        user = new User({
            username,
            email,
            password,
            phone
        });

        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password, salt);

        user.save();

        const payload = {
            user:{
                id:user.id
            }
        }

        jwt.sign(payload, jwtsecret, {
            expiresIn:3600*2
        },(err, token)=>{
            if(err) throw err;
            res.json({token})
        });


    } catch (error) {
        res.status(500).send("Internal Server Error.");
    }

});


module.exports = route;