const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');

const connectDB = require('./database/config');

const userRoute = require('./router/user')
const productRoute = require('./router/product')
const categoryRoute = require('./router/category')

const app = express();
dotenv.config();

//Database

connectDB();

//Middleware
app.use(cors());
app.use(morgan('tiny'));
app.use(express.json({extended:false}));

//Router
app.get('/', (req, res)=>{
    res.send('Hello');
});

app.use('/api/v1/', userRoute);
app.use('/api/v1/', productRoute);
app.use('/api/v1/', categoryRoute);


const port = process.env.PORT || 8000

app.listen(port,()=>{
    console.log(`Server runnig port ${port}`);
});