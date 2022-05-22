const express = require('express');
const route = express.Router();

route.get('/',(req, res)=>{
    res.send('Hello Auth Route')
});

route.post('/',()=>{
    
});



module.exports = route;